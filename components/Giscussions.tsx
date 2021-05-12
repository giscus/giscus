import { useContext } from 'react';
import { AuthContext } from '../lib/context';
import { useDiscussions } from '../services/giscussions/discussions';
import Comment from './Comment';
import CommentBox from './CommentBox';

interface IGiscussionsProps {
  repo: string;
  term: string;
  onError?: VoidFunction;
  onDiscussionCreateRequest?: () => Promise<string>;
}

export default function Giscussions({
  repo,
  term,
  onError,
  onDiscussionCreateRequest,
}: IGiscussionsProps) {
  const { token } = useContext(AuthContext);
  const query = { repo, term };

  const backComments = useDiscussions(query, token, { last: 15 });
  const {
    data: _backData,
    isError: isBackError,
    isLoading: isBackLoading,
    mutators: backMutators,
    error,
  } = backComments;

  const backData = _backData && _backData[_backData.length - 1];
  const intersectId = backData?.discussion?.comments?.[0]?.id;

  const frontParams = { first: 15 };

  const frontComments = useDiscussions(query, token, frontParams);
  const {
    data: _frontData,
    isError: isFrontError,
    isLoading: isFrontLoading,
    mutators: frontMutators,
    size,
    setSize,
  } = frontComments;

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

  const numHidden =
    backData?.discussion?.totalCommentCount -
    backData?.discussion?.comments?.length -
    frontData?.reduce((prev, g) => prev + g.discussion.comments?.length, 0);

  const needsFrontLoading = backData?.discussion?.pageInfo?.hasPreviousPage;

  const isError = isFrontError || isBackError;
  const isLoading = (needsFrontLoading && isFrontLoading) || isBackLoading;
  const isLoadingMore = isFrontLoading || (size > 0 && !frontData?.[size - 1]);

  const isNotFound = !isBackLoading && !backData?.discussion;

  const totalCommentCount = backData?.discussion?.totalCommentCount;
  const totalReplyCount =
    backData?.discussion?.totalReplyCount +
    frontData?.reduce((prev, g) => prev + g.discussion.totalReplyCount, 0);

  const context = backData?.discussion?.repository?.nameWithOwner;

  if (error?.error && onError) onError();

  const shouldShowReplyCount = !isError && !isNotFound && !isLoading;

  return (
    <div className="w-full color-text-primary">
      <div className="flex flex-auto">
        <h4 className="mb-2 mr-2 font-semibold">
          {isError
            ? `An error occurred${error.error ? `: ${error.error}` : ''}.`
            : isNotFound
            ? '0 comments'
            : isLoading
            ? 'Loading comments...'
            : `${totalCommentCount} comment${totalCommentCount !== 1 ? 's' : ''}`}
        </h4>
        {shouldShowReplyCount ? (
          <>
            <h4 className="mb-2 mr-2 font-semibold">·</h4>
            <h4 className="mb-2 mr-2">{`${Number.isNaN(totalReplyCount) ? 0 : totalReplyCount}${
              numHidden > 0 ? '+' : ''
            } repl${totalReplyCount !== 1 ? 'ies' : 'y'}`}</h4>
          </>
        ) : null}
      </div>

      {!isLoading
        ? frontData?.map((page) =>
            page?.discussion?.comments?.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onCommentUpdate={frontMutators.updateComment}
                onReplyUpdate={frontMutators.updateReply}
                renderReplyBox={
                  token
                    ? (viewMore) => (
                        <CommentBox
                          discussionId={backData?.discussion?.id}
                          context={context}
                          onSubmit={frontMutators.addNewReply}
                          replyToId={comment.id}
                          viewer={frontData && frontData[0].viewer}
                          onReplyOpen={viewMore}
                        />
                      )
                    : undefined
                }
              />
            )),
          )
        : null}

      {numHidden > 0 ? (
        <div className="flex justify-center py-2 my-4 bg-center bg-repeat-x pagination-loader-container">
          <button
            className="flex flex-col items-center px-6 py-2 text-sm border rounded color-bg-primary color-border-primary"
            onClick={() => setSize(size + 1)}
            disabled={isLoadingMore}
          >
            <span className="color-text-secondary">
              {numHidden} hidden item{numHidden !== 1 ? 's' : ''}
            </span>
            <span className="font-semibold color-text-link">
              {isLoadingMore ? 'Loading' : 'Load more'}...
            </span>
          </button>
        </div>
      ) : null}

      {!isLoading
        ? backData?.discussion?.comments?.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onCommentUpdate={backMutators.updateComment}
              onReplyUpdate={backMutators.updateReply}
              renderReplyBox={
                token
                  ? (viewMore) => (
                      <CommentBox
                        discussionId={backData?.discussion?.id}
                        context={context}
                        onSubmit={backMutators.addNewReply}
                        replyToId={comment.id}
                        viewer={backData?.viewer}
                        onReplyOpen={viewMore}
                      />
                    )
                  : undefined
              }
            />
          ))
        : null}

      <div className="my-4 text-sm border-t-2 color-border-primary" />

      {!isLoading ? (
        <CommentBox
          viewer={backData?.viewer}
          discussionId={backData?.discussion?.id}
          context={context}
          onSubmit={backMutators.addNewComment}
          onDiscussionCreateRequest={onDiscussionCreateRequest}
        />
      ) : null}
    </div>
  );
}
