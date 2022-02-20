import { useCallback, useMemo, useState } from 'react';
import { SWRConfig } from 'swr';
import useSWRInfinite from 'swr/infinite';
import { cleanParams, fetcher } from '../../lib/fetcher';
import { Reaction, updateDiscussionReaction } from '../../lib/reactions';
import { IComment, IGiscussion, IReply } from '../../lib/types/adapter';
import { DiscussionQuery, PaginationParams } from '../../lib/types/common';
import { CommentOrder, IDiscussionData } from '../../lib/types/giscus';

export function useDiscussion(
  query: DiscussionQuery,
  token?: string,
  pagination: PaginationParams = {},
) {
  const [errorStatus, setErrorStatus] = useState(0);
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

  const shouldRevalidate = (status: number) => ![403, 404, 429].includes(status);

  const { data, size, setSize, error, mutate, isValidating } = useSWRInfinite<IGiscussion>(
    getKey,
    fetcher,
    {
      onErrorRetry: (err, key, config, revalidate, opts) => {
        if (!shouldRevalidate(err?.status)) return;
        SWRConfig.default.onErrorRetry(err, key, config, revalidate, opts);
      },
      revalidateOnMount: shouldRevalidate(errorStatus),
      revalidateOnFocus: shouldRevalidate(errorStatus),
      revalidateOnReconnect: shouldRevalidate(errorStatus),
    },
  );

  if (error?.status && error.status !== errorStatus) {
    setErrorStatus(error.status);
  } else if (!error?.status && errorStatus) {
    setErrorStatus(0); // Clear error
  }

  const addNewComment = useCallback(
    (comment: IComment) => {
      if (!data) return mutate();
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

  const updateDiscussion = useCallback(
    (newDiscussions: IGiscussion[], promise?: Promise<unknown>) =>
      mutate(newDiscussions, !promise) && promise?.then(() => mutate()),
    [mutate],
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
    mutators: {
      addNewComment,
      addNewReply,
      updateDiscussion,
      updateComment,
      updateReply,
      mutate,
    },
  };
}

export function useFrontBackDiscussion(
  query: DiscussionQuery,
  token?: string,
  orderBy: CommentOrder = 'oldest',
) {
  const backDiscussion = useDiscussion(query, token, { last: 15 });
  const {
    data: _backData,
    isLoading: isBackLoading,
    mutators: _defaultMutators,
    error: backError,
  } = backDiscussion;

  const backData = _backData && _backData[_backData.length - 1];
  const intersectId = backData?.discussion?.comments?.[0]?.id;

  const frontDiscussion = useDiscussion(query, token, { first: 15 });
  const {
    data: _frontData,
    isLoading: isFrontLoading,
    size,
    setSize,
    error: frontError,
  } = frontDiscussion;

  const frontData = _frontData?.map((page) => {
    let foundIntersect = false;

    // We couldn't make use of GitHub API's `before` parameter to prevent
    // duplicates because that would change our key for SWR. Therefore,
    // we need to get rid of duplicates manually by removing the comments
    // that are already in backData.
    const newData = {
      ...page,
      discussion: {
        ...page?.discussion,
        comments: page?.discussion?.comments?.filter((comment) => {
          if (comment.id === intersectId) {
            foundIntersect = true;
          }
          return foundIntersect ? false : true;
        }),
      },
    };

    // Fix the reply count.
    newData.discussion.totalReplyCount = newData.discussion.comments?.reduce(
      (prev, c) => prev + c.replyCount,
      0,
    );

    return newData;
  });

  let backComments = backData?.discussion?.comments || [];
  let frontComments = frontData?.flatMap((page) => page?.discussion?.comments || []) || [];
  let backMutators = backDiscussion.mutators;
  let frontMutators = frontDiscussion.mutators;

  if (orderBy === 'newest') {
    const _frontComments = frontComments;
    frontComments = backComments.slice().reverse();
    backComments = _frontComments.slice().reverse();
    frontMutators = backDiscussion.mutators;
    backMutators = frontDiscussion.mutators;
  }

  const addNewComment = _defaultMutators.addNewComment;

  const updateReactions = useCallback(
    (reaction: Reaction, promise: Promise<unknown>) =>
      backData
        ? _defaultMutators.updateDiscussion([updateDiscussionReaction(backData, reaction)], promise)
        : promise.then(() => _defaultMutators.mutate()),
    [backData, _defaultMutators],
  );

  const increaseSize = useCallback(() => setSize(size + 1), [setSize, size]);

  const numHidden =
    backData?.discussion?.totalCommentCount -
    backData?.discussion?.comments?.length -
    frontData?.reduce((prev, g) => prev + g.discussion.comments?.length, 0);

  const reactionCount = backData?.discussion?.reactionCount;
  const totalCommentCount = backData?.discussion?.totalCommentCount;
  const totalReplyCount =
    (backData?.discussion?.totalReplyCount || 0) +
    (frontData?.reduce((prev, g) => prev + g.discussion.totalReplyCount, 0) || 0);

  const error = frontError || backError;
  const needsFrontLoading = backData?.discussion?.pageInfo?.hasPreviousPage;

  const isLoading = (needsFrontLoading && isFrontLoading) || isBackLoading;
  const isLoadingMore = isFrontLoading || (size > 0 && !frontData?.[size - 1]);
  const isNotFound = error?.status === 404;
  const isRateLimited = error?.status === 429;
  const isLocked = backData?.discussion?.locked;

  const discussion: IDiscussionData = {
    id: backData?.discussion?.id,
    url: backData?.discussion?.url,
    locked: backData?.discussion?.locked,
    reactions: backData?.discussion?.reactions,
    repository: backData?.discussion?.repository,
    reactionCount,
    totalCommentCount,
    totalReplyCount,
  };

  const viewer = backData?.viewer;

  return {
    addNewComment,
    updateReactions,
    increaseSize,
    frontData,
    frontComments,
    frontMutators,
    backData,
    backComments,
    backMutators,
    numHidden,
    reactionCount,
    totalCommentCount,
    totalReplyCount,
    error,
    isLoading,
    isLoadingMore,
    isNotFound,
    isRateLimited,
    isLocked,
    discussion,
    viewer,
  };
}
