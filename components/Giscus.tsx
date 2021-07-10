import { useContext, useEffect } from 'react';
import { AuthContext, ConfigContext } from '../lib/context';
import { useFrontBackDiscussion } from '../services/giscus/discussions';
import Comment from './Comment';
import CommentBox from './CommentBox';
import ReactButtons from './ReactButtons';

interface IGiscusProps {
  onDiscussionCreateRequest?: () => Promise<string>;
  onError?: (message: string) => void;
}

export default function Giscus({ onDiscussionCreateRequest, onError }: IGiscusProps) {
  const { token } = useContext(AuthContext);
  const { repo, term, number, category, reactionsEnabled } = useContext(ConfigContext);
  const query = { repo, term, category, number };

  const {
    updateReactions,
    increaseSize,
    backMutators,
    frontMutators,
    ...data
  } = useFrontBackDiscussion(query, token);

  useEffect(() => {
    if (data.error && onError) {
      onError(data.error?.message);
    }
  }, [data.error, onError]);

  const handleDiscussionCreateRequest = async () => {
    const id = await onDiscussionCreateRequest();
    // Force revalidate
    frontMutators.mutate();
    backMutators.mutate();
    return id;
  };

  const shouldCreateDiscussion = data.isNotFound && !number;
  const shouldShowBranding = !!data.discussion.url;

  const shouldShowReplyCount =
    !data.error && !data.isNotFound && !data.isLoading && data.totalReplyCount > 0;

  const shouldShowCommentBox =
    !data.isLoading && !data.isLocked && (!data.error || (data.isNotFound && !number));

  return (
    <div className="w-full color-text-primary">
      {reactionsEnabled && !data.isLoading && (shouldCreateDiscussion || !data.error) ? (
        <div className="flex flex-col justify-center flex-auto mb-4 gsc-reactions">
          <h4 className="font-semibold text-center gsc-reactions-count">
            {shouldCreateDiscussion && !data.reactionCount ? (
              '0 reactions'
            ) : (
              <a
                href={data.discussion.url}
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="color-text-primary"
              >
                {data.reactionCount || 0} reaction
                {data.reactionCount !== 1 ? 's' : ''}
              </a>
            )}
          </h4>
          <div className="flex justify-center flex-auto mt-2 text-sm">
            <ReactButtons
              subjectId={data.discussion.id}
              reactionGroups={data.discussion.reactions}
              onReact={updateReactions}
              onDiscussionCreateRequest={handleDiscussionCreateRequest}
            />
          </div>
        </div>
      ) : null}
      <div className="flex items-center flex-auto pb-2 gsc-header">
        <h4 className="mr-2 font-semibold gsc-comments-count">
          {shouldCreateDiscussion && !data.totalCommentCount ? (
            '0 comments'
          ) : data.error && !data.backData ? (
            `An error occurred${data.error?.message ? `: ${data.error.message}` : ''}.`
          ) : data.isLoading ? (
            'Loading comments...'
          ) : (
            <a
              href={data.discussion.url}
              target="_blank"
              rel="noreferrer noopener nofollow"
              className="color-text-primary"
            >
              {data.totalCommentCount} comment{data.totalCommentCount !== 1 ? 's' : ''}
            </a>
          )}
        </h4>
        {shouldShowReplyCount ? (
          <>
            <h4 className="mr-2 font-semibold gsc-comments-count-separator">·</h4>
            <h4 className="mr-2 gsc-replies-count">{`${
              Number.isNaN(data.totalReplyCount) ? 0 : data.totalReplyCount
            }${data.numHidden > 0 ? '+' : ''} repl${data.totalReplyCount !== 1 ? 'ies' : 'y'}`}</h4>
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

      {!data.isLoading
        ? data.frontComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onCommentUpdate={frontMutators.updateComment}
              onReplyUpdate={frontMutators.updateReply}
              renderReplyBox={
                token && !data.isLocked
                  ? (viewMore) => (
                      <CommentBox
                        discussionId={data.discussion.id}
                        context={repo}
                        onSubmit={frontMutators.addNewReply}
                        replyToId={comment.id}
                        viewer={data.viewer}
                        onReplyOpen={viewMore}
                      />
                    )
                  : undefined
              }
            />
          ))
        : null}

      {data.numHidden > 0 ? (
        <div className="flex justify-center py-2 my-4 bg-center bg-repeat-x pagination-loader-container">
          <button
            className="flex flex-col items-center px-6 py-2 text-sm border rounded color-bg-primary color-border-primary"
            onClick={increaseSize}
            disabled={data.isLoadingMore}
          >
            <span className="color-text-secondary">
              {data.numHidden} hidden item{data.numHidden !== 1 ? 's' : ''}
            </span>
            <span className="font-semibold color-text-link">
              {data.isLoadingMore ? 'Loading' : 'Load more'}...
            </span>
          </button>
        </div>
      ) : null}

      {!data.isLoading
        ? data.backComments?.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onCommentUpdate={backMutators.updateComment}
              onReplyUpdate={backMutators.updateReply}
              renderReplyBox={
                token && !data.isLocked
                  ? (viewMore) => (
                      <CommentBox
                        discussionId={data.discussion.id}
                        context={repo}
                        onSubmit={backMutators.addNewReply}
                        replyToId={comment.id}
                        viewer={data.viewer}
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
            viewer={data.viewer}
            discussionId={data.discussion.id}
            context={repo}
            onSubmit={backMutators.addNewComment}
            onDiscussionCreateRequest={handleDiscussionCreateRequest}
          />
        </>
      ) : null}
    </div>
  );
}
