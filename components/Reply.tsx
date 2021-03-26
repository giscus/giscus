import { KebabHorizontalIcon } from '@primer/octicons-react';
import ReactButtons from './ReactButtons';
import { IReply } from '../lib/models/adapter';
import { formatDistance, format } from 'date-fns';

export interface IReplyProps {
  reply: IReply;
}

export default function Reply({ reply }: IReplyProps) {
  return (
    <>
      <div className="relative pt-2 bg-gray-500 bg-opacity-5 gsc-reply">
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
        <div className="flex pt-2 pl-4">
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
          <div className="w-full ml-2">
            <div className="flex">
              <h3 className="flex items-center flex-auto pt-1">
                <a href={reply.author.url} className="flex items-center">
                  <span className="font-semibold">{reply.author.login}</span>
                </a>
                <a href={reply.url} className="ml-2 text-gray-500">
                  <div
                    className="whitespace-nowrap"
                    title={format(new Date(reply.createdAt), 'LLL d, y, p O')}
                  >
                    {formatDistance(new Date(reply.createdAt), new Date(), { addSuffix: true })}
                  </div>
                </a>
                <div className="hidden ml-2 text-xs sm:inline-flex">
                  <span className="px-1 ml-1 capitalize border border-blue-400 rounded-md border-opacity-30">
                    {reply.authorAssociation.toLowerCase()}
                  </span>
                </div>
              </h3>
              <div className="flex mr-4">
                <button className="text-gray-500 hover:text-blue-600">
                  <KebabHorizontalIcon />
                </button>
              </div>
            </div>
            <div className="">
              <div
                className="w-full py-4"
                dangerouslySetInnerHTML={{ __html: reply.bodyHTML }}
              ></div>
              <div className="relative flex content-center">
                <ReactButtons reactionGroups={reply.reactions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
