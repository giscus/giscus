import ReactButtons from './ReactButtons';
import { IReply } from '../lib/types/adapter';
import { useCallback } from 'react';
import { Reaction, updateCommentReaction } from '../lib/reactions';
import { handleCommentClick, processCommentBody } from '../lib/adapter';
import { useDateFormatter, useGiscusTranslation, useRelativeTimeFormatter } from '../lib/i18n';

interface IReplyProps {
  reply: IReply;
  onReplyUpdate: (newReply: IReply, promise: Promise<unknown>) => void;
}

export default function Reply({ reply, onReplyUpdate }: IReplyProps) {
  const { t } = useGiscusTranslation();
  const formatDate = useDateFormatter();
  const formatDateDistance = useRelativeTimeFormatter();

  const updateReactions = useCallback(
    (content: Reaction, promise: Promise<unknown>) =>
      onReplyUpdate(updateCommentReaction(reply, content), promise),
    [reply, onReplyUpdate],
  );

  const hidden = reply.deletedAt || reply.isMinimized;

  return (
    <div className="gsc-reply">
      <div className="gsc-tl-line" />
      <div className={`flex py-2 px-4 ${hidden ? 'items-center' : ''}`}>
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
              <div className="gsc-reply-author">
                <a
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  href={reply.author.url}
                  className="flex items-center"
                >
                  <span className="link-primary font-semibold">{reply.author.login}</span>
                </a>
                <a
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  href={reply.url}
                  className="link-secondary ml-2"
                >
                  <time
                    className="whitespace-nowrap"
                    title={formatDate(reply.createdAt)}
                    dateTime={reply.createdAt}
                  >
                    {formatDateDistance(reply.createdAt)}
                  </time>
                </a>
                {reply.authorAssociation !== 'NONE' ? (
                  <div className="hidden text-xs ml-2 sm:inline-flex">
                    <span
                      className={`capitalize ml-1 rounded-md border px-1 ${
                        reply.viewerDidAuthor ? 'color-box-border-info' : 'color-label-border'
                      }`}
                    >
                      {t(reply.authorAssociation)}
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="flex">
                {reply.lastEditedAt ? (
                  <button
                    className="color-text-secondary gsc-reply-edited"
                    title={t('lastEditedAt', { date: reply.lastEditedAt })}
                  >
                    {t('edited')}
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
          {/*
            The <div> element *might* have a child <button> element from
            GitHub's markdown renderer result that allows keyboard interaction.
          */}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            dir="auto"
            className={`markdown gsc-reply-content ${hidden ? ' not-shown' : ''}`}
            onClick={handleCommentClick}
            dangerouslySetInnerHTML={
              hidden ? undefined : { __html: processCommentBody(reply.bodyHTML) }
            }
          >
            {hidden ? (
              <em className="color-text-secondary">
                {reply.deletedAt ? t('thisCommentWasDeleted') : t('thisCommentWasHidden')}
              </em>
            ) : null}
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
