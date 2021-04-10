import { useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';
import { IComment, IGiscussion, IReply } from '../../lib/models/adapter';

export function useDiscussions(id: string, token?: string) {
  const urlParams = new URLSearchParams({ id });
  const headers = useMemo(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return { headers };
  }, [token]);

  const { data, error, mutate } = useSWR<IGiscussion>(
    [`/api/discussions?${urlParams}`, headers],
    fetcher,
  );

  const addNewComment = useCallback(
    (comment: IComment) =>
      mutate({
        ...data,
        totalCount: data.totalCount + 1,
        comments: [...data.comments, comment],
      }),
    [data, mutate],
  );

  const addNewReply = useCallback(
    (reply: IReply) =>
      mutate({
        ...data,
        totalCount: data.totalCount + 1,
        comments: data.comments.map((comment) =>
          comment.id === reply.replyToId
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment,
        ),
      }),
    [data, mutate],
  );

  const updateComment = useCallback(
    (newComment: IComment, promise?: Promise<unknown>) =>
      mutate(
        {
          ...data,
          comments: data.comments.map((comment) =>
            comment.id === newComment.id ? newComment : comment,
          ),
        },
        !promise,
      ) && promise?.then(() => mutate()),
    [data, mutate],
  );

  const updateReply = useCallback(
    (newReply: IReply, promise?: Promise<unknown>) =>
      mutate(
        {
          ...data,
          comments: data.comments.map((comment) =>
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
        !promise,
      ) && promise?.then(() => mutate()),
    [data, mutate],
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    mutators: { addNewComment, addNewReply, updateComment, updateReply },
  };
}
