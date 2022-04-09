import { ArrowUpIcon, KebabHorizontalIcon } from '@primer/octicons-react';
import { ReactElement, ReactNode, useCallback, useContext, useState } from 'react';
import { handleCommentClick, processCommentBody } from '../lib/adapter';
import { IComment, IReply } from '../lib/types/adapter';
import { Reaction, updateCommentReaction } from '../lib/reactions';
import { toggleUpvote } from '../services/github/toggleUpvote';
import CommentBox from './CommentBox';
import ReactButtons from './ReactButtons';
import Reply from './Reply';
import { AuthContext } from '../lib/context';
import { useDateFormatter, useGiscusTranslation, useRelativeTimeFormatter } from '../lib/i18n';

interface ICommentProps {
  children?: ReactNode;
  comment: IComment;
  replyBox?: ReactElement<typeof CommentBox>;
  onCommentUpdate?: (newComment: IComment, promise: Promise<unknown>) => void;
  onReplyUpdate?: (newReply: IReply, promise: Promise<unknown>) => void;
}

export default function Comment({
  children,
  comment,
  replyBox,
  onCommentUpdate,
  onReplyUpdate,
}: ICommentProps) {
  const { t } = useGiscusTranslation();
  const formatDate = useDateFormatter();
  const formatDateDistance = useRelativeTimeFormatter();
  const [backPage, setBackPage] = useState(0);

  const replies = comment.replies.slice(-5 - backPage * 50);
  const remainingReplies = comment.replyCount - replies.length;

  const hasNextPage = replies.length < comment.replies.length;
  const hasUnfetchedReplies = !hasNextPage && remainingReplies > 0;

  const { token } = useContext(AuthContext);

  const updateReactions = useCallback(
    (reaction: Reaction, promise: Promise<unknown>) =>
      onCommentUpdate(updateCommentReaction(comment, reaction), promise),
    [comment, onCommentUpdate],
  );

  const incrementBackPage = () => setBackPage(backPage + 1);

  const upvote = useCallback(() => {
    const upvoteCount = comment.viewerHasUpvoted
      ? comment.upvoteCount - 1
      : comment.upvoteCount + 1;

    const promise = toggleUpvote(
      { upvoteInput: { subjectId: comment.id } },
      token,
      comment.viewerHasUpvoted,
    );

    onCommentUpdate(
      {
        ...comment,
        upvoteCount,
        viewerHasUpvoted: !comment.viewerHasUpvoted,
      },
      promise,
    );
  }, [comment, onCommentUpdate, token]);

  const hidden = !!comment.deletedAt || comment.isMinimized;

  return (
    <div className="gsc-comment">
      <div
        className={`w-full min-w-0 border rounded-md color-bg-primary ${
          comment.viewerDidAuthor ? 'color-box-border-info' : 'color-border-primary'
        }`}
      >
        {!comment.isMinimized ? (
          <div className="gsc-comment-header">
            <div className="gsc-comment-author">
              <a
                rel="nofollow noopener noreferrer"
                target="_blank"
                href={comment.author.url}
                className="gsc-comment-author-avatar"
              >
                <img
                  className="mr-2 rounded-full"
                  src={comment.author.avatarUrl}
                  width="30"
                  height="30"
                  alt={`@${comment.author.login}`}
                />
                <span className="font-semibold link-primary">{comment.author.login}</span>
              </a>
              <a
                rel="nofollow noopener noreferrer"
                target="_blank"
                href={comment.url}
                className="ml-2 link-secondary"
              >
                <time
                  className="whitespace-nowrap"
                  title={formatDate(comment.createdAt)}
                  dateTime={comment.createdAt}
                >
                  {formatDateDistance(comment.createdAt)}
                </time>
              </a>
              {comment.authorAssociation !== 'NONE' ? (
                <div className="hidden ml-2 text-xs sm:inline-flex">
                  <span
                    className={`px-1 ml-1 capitalize border rounded-md ${
                      comment.viewerDidAuthor ? 'color-box-border-info' : 'color-label-border'
                    }`}
                  >
                    {t(comment.authorAssociation)}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="flex">
              {comment.lastEditedAt ? (
                <button
                  className="color-text-secondary gsc-comment-edited"
                  title={t('lastEditedAt', { date: formatDate(comment.lastEditedAt) })}
                >
                  {t('edited')}
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
        <div
          className={`markdown gsc-comment-content${
            comment.isMinimized ? ' minimized color-bg-tertiary border-color-primary' : ''
          }`}
          onClick={handleCommentClick}
          dangerouslySetInnerHTML={
            hidden ? undefined : { __html: processCommentBody(comment.bodyHTML) }
          }
        >
          {hidden ? (
            <em className="color-text-secondary">
              {comment.deletedAt ? t('thisCommentWasDeleted') : t('thisCommentWasMinimized')}
            </em>
          ) : null}
        </div>
        {children}
        {!comment.isMinimized && onCommentUpdate ? (
          <div className="gsc-comment-footer">
            <div className="gsc-comment-reactions">
              <button
                type="button"
                className={`gsc-upvote-button gsc-social-reaction-summary-item ${
                  comment.viewerHasUpvoted ? 'has-reacted' : ''
                }`}
                onClick={upvote}
                disabled={!token || !comment.viewerCanUpvote}
                aria-label={token ? t('upvote') : t('youMustBeSignedInToUpvote')}
                title={
                  token
                    ? t('upvotes', { count: comment.upvoteCount })
                    : t('youMustBeSignedInToUpvote')
                }
              >
                <ArrowUpIcon className="gsc-direct-reaction-button-emoji" />

                <span
                  className="gsc-social-reaction-summary-item-count"
                  title={t('upvotes', { count: comment.upvoteCount })}
                >
                  {comment.upvoteCount}
                </span>
              </button>
              {!hidden ? (
                <ReactButtons
                  reactionGroups={comment.reactions}
                  subjectId={comment.id}
                  onReact={updateReactions}
                  popoverPosition="top"
                />
              ) : null}
            </div>
            <div className="gsc-comment-replies-count">
              <span className="text-xs color-text-tertiary">
                {t('replies', { count: comment.replyCount, plus: '' })}
              </span>
            </div>
          </div>
        ) : null}
        {comment.replies.length > 0 ? (
          <div
            className={`color-bg-inset color-border-primary gsc-replies ${
              !replyBox || hidden ? 'rounded-b-md' : ''
            }`}
          >
            {hasNextPage || hasUnfetchedReplies ? (
              <div className="flex items-center h-8 pl-4 mb-2">
                <div className="flex content-center flex-shrink-0 mr-[9px] w-[29px]">
                  <KebabHorizontalIcon className="w-full rotate-90 fill-[var(--color-border-muted)]" />
                </div>

                {hasNextPage ? (
                  <button className="color-text-link hover:underline" onClick={incrementBackPage}>
                    {t('showPreviousReplies', { count: remainingReplies })}
                  </button>
                ) : null}

                {hasUnfetchedReplies ? (
                  <a
                    href={comment.url}
                    className="color-text-link hover:underline"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                  >
                    {t('seePreviousRepliesOnGitHub', { count: remainingReplies })}
                  </a>
                ) : null}
              </div>
            ) : null}

            {onReplyUpdate
              ? replies.map((reply) => (
                  <Reply key={reply.id} reply={reply} onReplyUpdate={onReplyUpdate} />
                ))
              : null}
          </div>
        ) : null}

        {!comment.isMinimized && !!replyBox ? replyBox : null}
      </div>
    </div>
  );
}
