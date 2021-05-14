import { useCallback, useMemo } from 'react';
import { SWRConfig, useSWRInfinite } from 'swr';
import { cleanParams, fetcher } from '../../lib/fetcher';
import { IComment, IGiscussion, IReply } from '../../lib/types/adapter';
import { DiscussionQuery, PaginationParams } from '../../lib/types/common';

export function useDiscussions(
  query: DiscussionQuery,
  token?: string,
  pagination: PaginationParams = {},
) {
  const urlParams = new URLSearchParams(cleanParams({ ...query, ...pagination }));

  const headers = useMemo(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return { headers };
  }, [token]);

  const getKey = (pageIndex: number, previousPageData?: IGiscussion) => {
    if (pagination.first === 0 || pagination.last === 0) return null;
    if (pageIndex === 0) return [`/api/discussions?${urlParams}`, headers];
    if (!previousPageData.discussion.pageInfo.hasNextPage) return null;
    const params = new URLSearchParams(
      cleanParams({
        ...query,
        after: previousPageData.discussion.pageInfo.endCursor,
        before: pagination.before,
      }),
    );
    return [`/api/discussions?${params}`, headers];
  };

  const { data, size, setSize, error, mutate, isValidating } = useSWRInfinite<IGiscussion>(
    getKey,
    fetcher,
    {
      onErrorRetry: (err, key, config, revalidate, opts) => {
        if ((err?.message || '').includes('not installed')) return;
        SWRConfig.default.onErrorRetry(err, key, config, revalidate, opts);
      },
    },
  );

  const addNewComment = useCallback(
    (comment: IComment) => {
      const firstPage = data.slice(0, data.length - 1);
      const [lastPage] = data.slice(-1);
      mutate(
        [
          ...firstPage,
          {
            ...lastPage,
            discussion: {
              ...lastPage.discussion,
              comments: [...(lastPage.discussion?.comments || []), comment],
            },
          },
        ],
        false,
      );
      return mutate();
    },
    [data, mutate],
  );

  const addNewReply = useCallback(
    (reply: IReply) => {
      const newData = data.map((page) => ({
        ...page,
        discussion: {
          ...page.discussion,
          comments: page.discussion.comments.map((comment) =>
            comment.id === reply.replyToId
              ? { ...comment, replies: [...comment.replies, reply] }
              : comment,
          ),
        },
      }));
      mutate(newData, false);
      return mutate();
    },
    [data, mutate],
  );

  const updateComment = useCallback(
    (newComment: IComment, promise?: Promise<unknown>) =>
      mutate(
        data.map((page) => ({
          ...page,
          discussion: {
            ...page.discussion,
            comments: page.discussion.comments.map((comment) =>
              comment.id === newComment.id ? newComment : comment,
            ),
          },
        })),
        !promise,
      ) && promise?.then(() => mutate()),
    [data, mutate],
  );

  const updateReply = useCallback(
    (newReply: IReply, promise?: Promise<unknown>) =>
      mutate(
        data.map((page) => ({
          ...page,
          discussion: {
            ...page.discussion,
            comments: page.discussion.comments.map((comment) =>
              comment.id === newReply.replyToId
                ? {
                    ...comment,
                    replies: comment.replies.map((reply) =>
                      reply.id === newReply.id ? newReply : reply,
                    ),
                  }
                : comment,
            ),
          },
        })),
        !promise,
      ) && promise?.then(() => mutate()),
    [data, mutate],
  );

  return {
    data,
    error,
    size,
    setSize,
    isValidating,
    isLoading: !error && !data,
    isError: !!error,
    mutators: { addNewComment, addNewReply, updateComment, updateReply },
  };
}
