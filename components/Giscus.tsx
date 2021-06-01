import { useCallback, useContext } from 'react';
import { AuthContext } from '../lib/context';
import { Reactions, updateDiscussionReaction } from '../lib/reactions';
import { useDiscussions } from '../services/giscus/discussions';
import Comment from './Comment';
import CommentBox from './CommentBox';
import ReactButtons from './ReactButtons';

interface IGiscusProps {
  repo: string;
  term?: string;
  number?: number;
  reactionsEnabled: boolean;
  onDiscussionCreateRequest?: () => Promise<string>;
  onError?: (message: string) => void;
}

export default function Giscus({
  repo,
  term,
  number,
  reactionsEnabled,
  onDiscussionCreateRequest,
  onError,
}: IGiscusProps) {
  const { token } = useContext(AuthContext);
  const query = { repo, term, number };

  const backComments = useDiscussions(query, token, { last: 15 });
  const {
    data: _backData,
    isLoading: isBackLoading,
    mutators: backMutators,
    error: backError,
  } = backComments;

  const backData = _backData && _backData[_backData.length - 1];
  const intersectId = backData?.discussion?.comments?.[0]?.id;

  const frontComments = useDiscussions(query, token, { first: 15 });
  const {
    data: _frontData,
    isLoading: isFrontLoading,
    mutators: frontMutators,
    size,
    setSize,
    error: frontError,
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

  const updateReactions = useCallback(
    (reaction: Reactions, promise: Promise<unknown>) =>
      backData
        ? backMutators.updateDiscussion([updateDiscussionReaction(backData, reaction)], promise)
        : promise.then(() => backMutators.mutate()),
    [backData, backMutators],
  );

  const numHidden =
    backData?.discussion?.totalCommentCount -
    backData?.discussion?.comments?.length -
    frontData?.reduce((prev, g) => prev + g.discussion.comments?.length, 0);

  const totalReactionCount = backData?.discussion?.reactionCount;
  const totalCommentCount = backData?.discussion?.totalCommentCount;
  const totalReplyCount =
    backData?.discussion?.totalReplyCount +
    frontData?.reduce((prev, g) => prev + g.discussion.totalReplyCount, 0);

  const error = frontError || backError;
  const context = backData?.discussion?.repository?.nameWithOwner;
  const needsFrontLoading = backData?.discussion?.pageInfo?.hasPreviousPage;

  const isLoading = (needsFrontLoading && isFrontLoading) || isBackLoading;
  const isLoadingMore = isFrontLoading || (size > 0 && !frontData?.[size - 1]);
  const isNotFound = error?.status === 404;
  const isLocked = backData?.discussion?.locked;

  const shouldShowBranding = !!backData?.discussion?.url;
  const shouldShowReplyCount = !error && !isNotFound && !isLoading && totalReplyCount > 0;
  const shouldShowCommentBox = !isLoading && !isLocked && (!error || (isNotFound && !number));
  const shouldCreateDiscussion = isNotFound && !number;

  if (error && onError) {
    onError(error?.message);
  }

  const handleDiscussionCreateRequest = async () => {
    const id = await onDiscussionCreateRequest();
    // Force revalidate
    frontMutators.mutate();
    backMutators.mutate();
    return id;
  };

  return (
    <div className="w-full color-text-primary">
      {reactionsEnabled && !isLoading && (shouldCreateDiscussion || !error) ? (
        <div className="flex flex-col justify-center flex-auto mb-3 dmd:mb-1">
          <h4 className="font-semibold text-center">
            {shouldCreateDiscussion && !totalReactionCount ? (
              '0 reactions'
            ) : (
              <a
                href={backData?.discussion?.url}
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="color-text-primary"
              >
                {totalReactionCount || 0} reaction
                {totalReactionCount !== 1 ? 's' : ''}
              </a>
            )}
          </h4>
          <div className="flex justify-center flex-auto mt-2 text-sm">
            <ReactButtons
              subjectId={backData?.discussion?.id}
              reactionGroups={backData?.discussion?.reactions}
              onReact={updateReactions}
              onDiscussionCreateRequest={handleDiscussionCreateRequest}
            />
          </div>
        </div>
      ) : null}
      <div className="flex items-center flex-auto pb-2">
        <h4 className="mr-2 font-semibold">
          {shouldCreateDiscussion && !totalCommentCount ? (
            '0 comments'
          ) : error && !backData ? (
            `An error occurred${error?.message ? `: ${error.message}` : ''}.`
          ) : isLoading ? (
            'Loading comments...'
          ) : (
            <a
              href={backData?.discussion?.url}
              target="_blank"
              rel="noreferrer noopener nofollow"
              className="color-text-primary"
            >
              {totalCommentCount} comment{totalCommentCount !== 1 ? 's' : ''}
            </a>
          )}
        </h4>
        {shouldShowReplyCount ? (
          <>
            <h4 className="mr-2 font-semibold">·</h4>
            <h4 className="mr-2">{`${Number.isNaN(totalReplyCount) ? 0 : totalReplyCount}${
              numHidden > 0 ? '+' : ''
            } repl${totalReplyCount !== 1 ? 'ies' : 'y'}`}</h4>
          </>
        ) : null}
        {shouldShowBranding ? (
          <em className="text-sm color-text-secondary">
            {' '}
            – powered by{' '}
            <a
              href="https://giscus.app"
              target="_blank"
              rel="noreferrer noopener nofollow"
              className="Link--secondary"
            >
              giscus
            </a>
          </em>
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
                  token && !isLocked
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
                token && !isLocked
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

      {shouldShowCommentBox ? (
        <>
          <div className="my-4 text-sm border-t-2 color-border-primary" />
          <CommentBox
            viewer={backData?.viewer}
            discussionId={backData?.discussion?.id}
            context={context}
            onSubmit={backMutators.addNewComment}
            onDiscussionCreateRequest={handleDiscussionCreateRequest}
          />
        </>
      ) : null}
    </div>
  );
}
