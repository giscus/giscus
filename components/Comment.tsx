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
  const { t, dir } = useGiscusTranslation();
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
        className={`color-bg-primary w-full min-w-0 rounded-md border ${
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
                  loading="lazy"
                />
                <span className="link-primary overflow-hidden text-ellipsis font-semibold">
                  {comment.author.login}
                </span>
              </a>
              <a
                rel="nofollow noopener noreferrer"
                target="_blank"
                href={comment.url}
                className="link-secondary overflow-hidden text-ellipsis"
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
                <div className="hidden text-xs leading-[18px] sm:inline-flex">
                  <span className="color-box-border-info font-medium capitalize ml-1 rounded-xl border px-[7px]">
                    {t(comment.authorAssociation)}
                  </span>
                </div>
              ) : null}
            </div>
            {comment.lastEditedAt ? (
              <button
                className="color-text-secondary gsc-comment-edited"
                title={t('lastEditedAt', { date: formatDate(comment.lastEditedAt) })}
              >
                {t('edited')}
              </button>
            ) : null}
          </div>
        ) : null}
        {/*
          The <div> element *might* have a child <button> element from
          GitHub's markdown renderer result that allows keyboard interaction.
        */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div
          dir={children ? dir : 'auto'}
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
                // TODO: Remove `true ||` when GitHub allows upvote with app-issued user tokens
                // https://github.com/orgs/community/discussions/3968
                disabled={true || !token || !comment.viewerCanUpvote}
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
              <span className="color-text-tertiary text-xs">
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
              <div className="flex h-8 items-center mb-2 pl-4">
                <div className="flex w-[29px] shrink-0 content-center mr-[9px]">
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
