import { KebabHorizontalIcon } from '@primer/octicons-react';
import ReactButtons from './ReactButtons';
import { IReply } from '../lib/models/adapter';
import { useCallback } from 'react';
import { Reactions, updateCommentReaction } from '../lib/reactions';
import { formatDate, formatDateDistance } from '../lib/utils';

export interface IReplyProps {
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
    <div className="relative gsc-reply">
      <div className="w-[2px] flex-shrink-0 bg-gray-500 bg-opacity-10 absolute left-[30px] h-full top-0 gsc-tl-line">
        <style jsx>
          {`
            :global(.gsc-reply):first-child > .gsc-tl-line {
              top: 16px;
              height: calc(100% - 16px);
            }
          `}
        </style>
      </div>
      <div className={`flex py-2 pl-4 ${hidden ? 'items-center' : ''}`}>
        <div className="z-10 flex-shrink-0">
          <a href={reply.author.url} className="flex items-center">
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
            <div className="flex">
              <h3 className="flex items-start flex-auto">
                <a href={reply.author.url} className="flex items-center">
                  <span className="font-semibold">{reply.author.login}</span>
                </a>
                <a href={reply.url} className="ml-2 text-gray-500">
                  <div className="whitespace-nowrap" title={formatDate(reply.createdAt)}>
                    {formatDateDistance(reply.createdAt)}
                  </div>
                </a>
                {reply.authorAssociation ? (
                  <div className="hidden ml-2 text-xs sm:inline-flex">
                    <span className="px-1 ml-1 capitalize border border-blue-400 rounded-md border-opacity-30">
                      {reply.authorAssociation}
                    </span>
                  </div>
                ) : null}
              </h3>
              <div className="flex pr-4">
                {reply.lastEditedAt ? (
                  <button
                    className="hidden mr-2 text-gray-600 sm:inline-block"
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
                <button className="hidden text-gray-500 hover:text-blue-600 sm:inline-block">
                  <KebabHorizontalIcon />
                </button>
              </div>
            </div>
          ) : null}
          <div
            className={`w-full pr-4 markdown ${!hidden ? 'pb-2' : ''}`}
            dangerouslySetInnerHTML={hidden ? undefined : { __html: reply.bodyHTML }}
          >
            <em className="text-gray-500">
              This comment {reply.deletedAt ? 'was deleted' : 'has been hidden'}.
            </em>
          </div>
          {!hidden ? (
            <div className="flex content-center mr-4">
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
