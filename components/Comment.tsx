import { ArrowUpIcon, KebabHorizontalIcon } from '@primer/octicons-react';
import { ReactElement, useCallback, useState } from 'react';
import { IComment, IReply } from '../lib/models/adapter';
import { Reactions, updateCommentReaction } from '../lib/reactions';
import { formatDate, formatDateDistance } from '../lib/utils';
import CommentBox from './CommentBox';
import ReactButtons from './ReactButtons';
import Reply from './Reply';

export interface ICommentProps {
  comment: IComment;
  children?: ReactElement<typeof CommentBox>;
  onCommentUpdate: (newComment: IComment, promise: Promise<unknown>) => void;
  onReplyUpdate: (newReply: IReply, promise: Promise<unknown>) => void;
}

export default function Comment({
  comment,
  children,
  onCommentUpdate,
  onReplyUpdate,
}: ICommentProps) {
  const [page, setPage] = useState(0);
  const replies = comment.replies.slice(0, page === 0 ? 3 : undefined);

  const updateReactions = useCallback(
    (reaction: Reactions, promise: Promise<unknown>) =>
      onCommentUpdate(updateCommentReaction(comment, reaction), promise),
    [comment, onCommentUpdate],
  );

  const hidden = comment.deletedAt || comment.isMinimized;

  return (
    <div className="flex my-4 text-sm">
      {!comment.isMinimized ? (
        <div className="flex-shrink-0 mr-2 w-14">
          <div className="flex flex-col">
            <button type="button" className={`${comment.viewerHasUpvoted ? 'text-blue-600' : ''}`}>
              <ArrowUpIcon className="transform hover:translate-y-[-10%] transition-transform ease-in-out duration-150" />
            </button>
            <div className="flex justify-center w-full">
              <div className="flex flex-row justify-center min-w-[26px] px-2 py-1 text-blue-900 bg-blue-400 bg-opacity-20 rounded-full">
                <div className="overflow-hidden text-xs">{comment.upvoteCount}</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="w-full min-w-0 border border-blue-400 rounded-md border-opacity-30">
        {!comment.isMinimized ? (
          <div className="flex items-center px-4">
            <h3 className="flex items-center flex-auto pt-2">
              <a href={comment.author.url} className="flex items-center">
                <img
                  className="mr-2 rounded-full"
                  src={comment.author.avatarUrl}
                  width="30"
                  height="30"
                  alt={`@${comment.author.login}`}
                />
                <span className="font-semibold">{comment.author.login}</span>
              </a>
              <a href={comment.url} className="ml-2 text-gray-500">
                <div className="whitespace-nowrap" title={formatDate(comment.createdAt)}>
                  {formatDateDistance(comment.createdAt)}
                </div>
              </a>
              {comment.authorAssociation ? (
                <div className="hidden ml-2 text-xs sm:inline-flex">
                  <span className="px-1 ml-1 capitalize border border-blue-400 rounded-md border-opacity-30">
                    {comment.authorAssociation}
                  </span>
                </div>
              ) : null}
            </h3>
            <div className="flex">
              {comment.lastEditedAt ? (
                <button
                  className="hidden mr-2 text-gray-600 sm:inline-block"
                  title={`Last edited at ${formatDate(comment.lastEditedAt)}`}
                >
                  edited
                </button>
              ) : null}
              <button className="hidden text-gray-500 hover:text-blue-600 sm:inline-block">
                <KebabHorizontalIcon />
              </button>
            </div>
          </div>
        ) : null}
        <div
          className={`markdown ${
            comment.isMinimized ? 'px-4 py-2 bg-gray-500 bg-opacity-5' : 'p-4'
          }`}
          dangerouslySetInnerHTML={hidden ? undefined : { __html: comment.bodyHTML }}
        >
          <em className="text-gray-500">
            This comment {comment.deletedAt ? 'was deleted' : 'has been minimized'}.
          </em>
        </div>
        {!comment.isMinimized ? (
          <div className="flex content-center justify-between">
            <div className="flex mx-4">
              {!hidden ? (
                <ReactButtons
                  reactionGroups={comment.reactions}
                  subjectId={comment.id}
                  onReact={updateReactions}
                />
              ) : null}
            </div>
            <div className="mb-4 mr-4">
              <span className="text-xs text-gray-500">
                {comment.replies.length}&nbsp;{comment.replies.length === 1 ? 'reply' : 'replies'}
              </span>
            </div>
          </div>
        ) : null}
        {comment.replies.length > 0 ? (
          <div className="pt-2 bg-gray-500 border-t bg-opacity-5">
            {replies.map((reply) => (
              <Reply key={reply.id} reply={reply} onReplyUpdate={onReplyUpdate} />
            ))}
            {page === 0 && comment.replies.length > 3 ? (
              <button
                className="mb-2 ml-3 text-xs font-semibold text-blue-700 hover:underline"
                onClick={() => setPage(page + 1)}
              >
                View more
              </button>
            ) : null}
          </div>
        ) : null}
        {!hidden ? children : null}
      </div>
    </div>
  );
}
