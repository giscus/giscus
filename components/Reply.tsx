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
      <div className={`flex ${hidden ? 'items-center' : ''}`}>
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
              loading="lazy"
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
                  className="flex min-w-0 items-center"
                >
                  <span className="link-primary overflow-hidden text-ellipsis font-semibold">
                    {reply.author.login}
                  </span>
                </a>
                <a
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  href={reply.url}
                  className="link-secondary overflow-hidden text-ellipsis"
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
                  <div className="hidden text-xs leading-[18px] sm:inline-flex">
                    <span className="color-box-border-info font-medium capitalize rounded-xl border px-[7px]">
                      {t(reply.authorAssociation)}
                    </span>
                  </div>
                ) : null}
              </div>
              {reply.lastEditedAt ? (
                <button
                  className="color-text-secondary gsc-reply-edited"
                  title={t('lastEditedAt', { date: reply.lastEditedAt })}
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
            <div className="gsc-reply-footer">
              <div className="gsc-reply-reactions">
                <ReactButtons
                  reactionGroups={reply.reactions}
                  subjectId={reply.id}
                  onReact={updateReactions}
                  popoverPosition="top"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
