import { useContext, useEffect } from 'react';
import { AuthContext, ConfigContext } from '../lib/context';
import { useGiscusTranslation } from '../lib/i18n';
import { emitData } from '../lib/messages';
import { IMetadataMessage } from '../lib/types/giscus';
import { useFrontBackDiscussion } from '../services/giscus/discussions';
import Comment from './Comment';
import CommentBox from './CommentBox';
import ReactButtons from './ReactButtons';

interface IGiscusProps {
  onDiscussionCreateRequest?: () => Promise<string>;
  onError?: (message: string) => void;
}

export default function Giscus({ onDiscussionCreateRequest, onError }: IGiscusProps) {
  const { token, origin } = useContext(AuthContext);
  const { t } = useGiscusTranslation();
  const { repo, term, number, category, reactionsEnabled, emitMetadata } =
    useContext(ConfigContext);
  const query = { repo, term, category, number };

  const { updateReactions, increaseSize, backMutators, frontMutators, ...data } =
    useFrontBackDiscussion(query, token);

  useEffect(() => {
    if (data.error && onError) {
      onError(data.error?.message);
    }
  }, [data.error, onError]);

  useEffect(() => {
    if (!emitMetadata || !data.discussion.id) return;
    const message: IMetadataMessage = {
      discussion: data.discussion,
      viewer: data.viewer,
    };
    emitData(message, origin);
  }, [data.discussion, data.viewer, emitMetadata, origin]);

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
    (data.isRateLimited && !token) ||
    (!data.isLoading && !data.isLocked && (!data.error || (data.isNotFound && !number)));

  return (
    <div className="color-text-primary gsc-main">
      {reactionsEnabled && !data.isLoading && (shouldCreateDiscussion || !data.error) ? (
        <div className="gsc-reactions">
          <h4 className="gsc-reactions-count">
            {shouldCreateDiscussion && !data.reactionCount ? (
              t('reactions', { count: 0 })
            ) : (
              <a
                href={data.discussion.url}
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="color-text-primary"
              >
                {t('reactions', { count: data.reactionCount || 0 })}
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

      <div className="gsc-comments">
        <div className="gsc-header">
          <h4 className="gsc-comments-count">
            {shouldCreateDiscussion && !data.totalCommentCount ? (
              t('comments', { count: 0 })
            ) : data.error && !data.backData ? (
              t('genericError', { message: data.error?.message || '' })
            ) : data.isLoading ? (
              t('loadingComments')
            ) : (
              <a
                href={data.discussion.url}
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="color-text-primary"
              >
                {t('comments', { count: data.totalCommentCount })}
              </a>
            )}
          </h4>
          {shouldShowReplyCount ? (
            <>
              <h4 className="gsc-comments-count-separator">·</h4>
              <h4 className="gsc-replies-count">
                {t('replies', { count: data.totalReplyCount, plus: data.numHidden > 0 ? '+' : '' })}
              </h4>
            </>
          ) : null}
          {shouldShowBranding ? (
            <em className="text-sm color-text-secondary">
              {' '}
              {t('poweredBy')}{' '}
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

        <div className="gsc-timeline">
          {!data.isLoading
            ? data.frontComments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  replyBox={
                    token && !data.isLocked ? (
                      <CommentBox
                        discussionId={data.discussion.id}
                        context={repo}
                        onSubmit={frontMutators.addNewReply}
                        replyToId={comment.id}
                        viewer={data.viewer}
                      />
                    ) : undefined
                  }
                  onCommentUpdate={frontMutators.updateComment}
                  onReplyUpdate={frontMutators.updateReply}
                />
              ))
            : null}

          {data.numHidden > 0 ? (
            <div className="pagination-loader-container gsc-pagination">
              <button
                className="flex flex-col items-center px-6 py-2 text-sm border rounded color-bg-primary color-border-primary"
                onClick={increaseSize}
                disabled={data.isLoadingMore}
              >
                <span className="color-text-secondary">
                  {t('hiddenItems', { count: data.numHidden })}
                </span>
                <span className="font-semibold color-text-link">
                  {data.isLoadingMore ? t('loading') : t('loadMore')}…
                </span>
              </button>
            </div>
          ) : null}

          {!data.isLoading
            ? data.backComments?.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  replyBox={
                    token && !data.isLocked ? (
                      <CommentBox
                        discussionId={data.discussion.id}
                        context={repo}
                        onSubmit={backMutators.addNewReply}
                        replyToId={comment.id}
                        viewer={data.viewer}
                      />
                    ) : undefined
                  }
                  onCommentUpdate={backMutators.updateComment}
                  onReplyUpdate={backMutators.updateReply}
                />
              ))
            : null}
        </div>

        {shouldShowCommentBox ? (
          <>
            <hr className="gsc-comment-box-separator color-border-primary" />
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
    </div>
  );
}
