import ReactButtons from './ReactButtons';
import { IReply } from '../lib/types/adapter';
import { useCallback } from 'react';
import { Reactions, updateCommentReaction } from '../lib/reactions';
import { formatDate, formatDateDistance } from '../lib/utils';
import { handleCommentClick, processCommentBody } from '../lib/adapter';

interface IReplyProps {
  reply: IReply;
  onReplyUpdate: (newReply: IReply, promise: Promise<unknown>) => void;
}

export default function Reply({ reply, onReplyUpdate }: IReplyProps) {
  const updateReactions = useCallback(
    (content: Reactions, promise: Promise<unknown>) =>
      onReplyUpdate(updateCommentReaction(reply, content), promise),
    [reply, onReplyUpdate],
  );

  const hidden = reply.deletedAt || reply.isMinimized;

  return (
    <div className="gsc-reply">
      <div className="gsc-tl-line" />
      <div className={`flex py-2 pl-4 ${hidden ? 'items-center' : ''}`}>
        <div className="gsc-reply-author-avatar">
          <a
            rel="nofollow noopener noreferrer"
            target="_blank"
            href={reply.author.url}
            className="flex items-center"
          >
            <img
              className="rounded-full"
              src={reply.author.avatarUrl}
              width="30"
              height="30"
              alt={`@${reply.author.login}`}
            />
          </a>
        </div>
        <div className="w-full min-w-0 ml-2">
          {!hidden ? (
            <div className="gsc-reply-header">
              <h3 className="gsc-reply-author">
                <a
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  href={reply.author.url}
                  className="flex items-center"
                >
                  <span className="font-semibold Link--primary">{reply.author.login}</span>
                </a>
                <a
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  href={reply.url}
                  className="ml-2 Link--secondary"
                >
                  <time
                    className="whitespace-nowrap"
                    title={formatDate(reply.createdAt)}
                    dateTime={reply.createdAt}
                  >
                    {formatDateDistance(reply.createdAt)}
                  </time>
                </a>
                {reply.authorAssociation ? (
                  <div className="hidden ml-2 text-xs sm:inline-flex">
                    <span
                      className={`px-1 ml-1 capitalize border rounded-md ${
                        reply.viewerDidAuthor ? 'color-box-border-info' : 'color-label-border'
                      }`}
                    >
                      {reply.authorAssociation}
                    </span>
                  </div>
                ) : null}
              </h3>
              <div className="flex pr-4">
                {reply.lastEditedAt ? (
                  <button
                    className="color-text-secondary gsc-reply-edited"
                    title={`Last edited at ${formatDate(reply.lastEditedAt)}`}
                  >
                    edited
                  </button>
                ) : null}
                <ReactButtons
                  reactionGroups={reply.reactions}
                  subjectId={reply.id}
                  variant="popoverOnly"
                  onReact={updateReactions}
                />
              </div>
            </div>
          ) : null}
          <div
            className={`markdown gsc-reply-content ${!hidden ? ' not-shown' : ''}`}
            onClick={handleCommentClick}
            dangerouslySetInnerHTML={
              hidden ? undefined : { __html: processCommentBody(reply.bodyHTML) }
            }
          >
            <em className="color-text-secondary">
              This comment {reply.deletedAt ? 'was deleted' : 'has been hidden'}.
            </em>
          </div>
          {!hidden ? (
            <div className="gsc-reply-reactions">
              <ReactButtons
                reactionGroups={reply.reactions}
                subjectId={reply.id}
                variant="groupsOnly"
                onReact={updateReactions}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
