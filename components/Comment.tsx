import { ArrowUpIcon, KebabHorizontalIcon } from '@primer/octicons-react';
import { ReactElement, ReactNode, useCallback, useContext, useState } from 'react';
import { handleCommentClick, processCommentBody } from '../lib/adapter';
import { IComment, IReply } from '../lib/types/adapter';
import { Reactions, updateCommentReaction } from '../lib/reactions';
import { formatDate, formatDateDistance } from '../lib/utils';
import { toggleUpvote } from '../services/github/toggleUpvote';
import CommentBox from './CommentBox';
import ReactButtons from './ReactButtons';
import Reply from './Reply';
import { AuthContext } from '../lib/context';

interface ICommentProps {
  children?: ReactNode;
  comment: IComment;
  onCommentUpdate?: (newComment: IComment, promise: Promise<unknown>) => void;
  onReplyUpdate?: (newReply: IReply, promise: Promise<unknown>) => void;
  renderReplyBox?: (viewMore: VoidFunction) => ReactElement<typeof CommentBox>;
}

export default function Comment({
  children,
  comment,
  onCommentUpdate,
  onReplyUpdate,
  renderReplyBox,
}: ICommentProps) {
  const [page, setPage] = useState(0);
  const replies = comment.replies.slice(0, page === 0 ? 3 : undefined);
  const { token } = useContext(AuthContext);

  const updateReactions = useCallback(
    (reaction: Reactions, promise: Promise<unknown>) =>
      onCommentUpdate(updateCommentReaction(comment, reaction), promise),
    [comment, onCommentUpdate],
  );

  const incrementPage = () => page < 1 && setPage(page + 1);

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

  const hidden = comment.deletedAt || comment.isMinimized;

  return (
    <div className="gsc-comment">
      {!comment.isMinimized && onCommentUpdate ? (
        <div className="gsc-upvotes">
          <button
            type="button"
            className={`gsc-upvote-button ${
              comment.viewerHasUpvoted ? 'color-text-link' : 'color-text-secondary'
            }`}
            onClick={upvote}
            disabled={!token || !comment.viewerCanUpvote}
          >
            <ArrowUpIcon className="transform hover:translate-y-[-10%] transition-transform ease-in-out duration-150" />
          </button>
          <div
            className={`gsc-upvote-count ${
              comment.viewerHasUpvoted
                ? 'color-text-link color-upvote-icon-bg'
                : 'Counter--secondary'
            }`}
            title={`${comment.upvoteCount} upvote${comment.upvoteCount !== 1 ? 's' : ''}`}
          >
            {comment.upvoteCount}
          </div>
        </div>
      ) : null}
      <div
        className={`w-full min-w-0 border rounded-md color-bg-primary ${
          comment.viewerDidAuthor ? 'color-box-border-info' : 'color-border-primary'
        }`}
      >
        {!comment.isMinimized ? (
          <div className="gsc-comment-header">
            <h3 className="gsc-comment-author">
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
                <span className="font-semibold Link--primary">{comment.author.login}</span>
              </a>
              <a
                rel="nofollow noopener noreferrer"
                target="_blank"
                href={comment.url}
                className="ml-2 Link--secondary"
              >
                <time
                  className="whitespace-nowrap"
                  title={formatDate(comment.createdAt)}
                  dateTime={comment.createdAt}
                >
                  {formatDateDistance(comment.createdAt)}
                </time>
              </a>
              {comment.authorAssociation ? (
                <div className="hidden ml-2 text-xs sm:inline-flex">
                  <span
                    className={`px-1 ml-1 capitalize border rounded-md ${
                      comment.viewerDidAuthor ? 'color-box-border-info' : 'color-label-border'
                    }`}
                  >
                    {comment.authorAssociation}
                  </span>
                </div>
              ) : null}
            </h3>
            <div className="flex">
              {comment.lastEditedAt ? (
                <button
                  className="color-text-secondary gsc-comment-edited"
                  title={`Last edited at ${formatDate(comment.lastEditedAt)}`}
                >
                  edited
                </button>
              ) : null}
              <button className="hidden Link--secondary">
                {
                  // TODO: implement menu and add sm:inline-block class
                }
                <KebabHorizontalIcon />
              </button>
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
          <em className="color-text-secondary">
            This comment {comment.deletedAt ? 'was deleted' : 'has been minimized'}.
          </em>
        </div>
        {children}
        {!comment.isMinimized && onCommentUpdate ? (
          <div
            className={`flex content-center justify-between ${
              renderReplyBox || comment.replies.length > 0 ? 'border-b' : ''
            }${comment.replies.length > 0 ? ' rounded-b-md' : ''}`}
          >
            <div className="gsc-comment-reactions">
              {!hidden ? (
                <ReactButtons
                  reactionGroups={comment.reactions}
                  subjectId={comment.id}
                  onReact={updateReactions}
                />
              ) : null}
            </div>
            <div className="gsc-comment-replies-count">
              <span className="text-xs color-text-tertiary">
                {comment.replies.length}&nbsp;{comment.replies.length === 1 ? 'reply' : 'replies'}
              </span>
            </div>
          </div>
        ) : null}
        {comment.replies.length > 0 ? (
          <div
            className={`color-bg-canvas-inset color-border-primary gsc-replies ${
              renderReplyBox && !comment.isMinimized ? 'border-b' : 'rounded-b-md'
            }`}
          >
            {onReplyUpdate
              ? replies.map((reply) => (
                  <Reply key={reply.id} reply={reply} onReplyUpdate={onReplyUpdate} />
                ))
              : null}
            {page === 0 && comment.replies.length > 3 ? (
              <button
                className="mb-2 ml-3 text-xs font-semibold color-text-link hover:underline"
                onClick={incrementPage}
              >
                View more
              </button>
            ) : null}
          </div>
        ) : null}
        {!hidden && renderReplyBox ? renderReplyBox(incrementPage) : null}
      </div>
    </div>
  );
}
