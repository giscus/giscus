import { KebabHorizontalIcon } from '@primer/octicons-react';
import ReactButtons from './ReactButtons';
import { IReply } from '../lib/models/adapter';
import { useCallback } from 'react';
import { Reactions, updateCommentReaction } from '../lib/reactions';
import { formatDate, formatDateDistance } from '../lib/string';

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
      <div className="flex py-2 pl-4">
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
              <div className="hidden ml-2 text-xs sm:inline-flex">
                <span className="px-1 ml-1 capitalize border border-blue-400 rounded-md border-opacity-30">
                  {reply.authorAssociation.toLowerCase()}
                </span>
              </div>
            </h3>
            <div className="flex pr-4">
              <ReactButtons
                reactionGroups={reply.reactions}
                subjectId={reply.id}
                variant="popoverOnly"
                onReact={updateReactions}
              />
              <button className="text-gray-500 hover:text-blue-600">
                <KebabHorizontalIcon />
              </button>
            </div>
          </div>
          <div
            className="w-full pb-2 pr-4 markdown"
            dangerouslySetInnerHTML={{ __html: reply.bodyHTML }}
          ></div>
          <div className="relative flex content-center mr-4">
            <ReactButtons
              reactionGroups={reply.reactions}
              subjectId={reply.id}
              variant="groupsOnly"
              onReact={updateReactions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
