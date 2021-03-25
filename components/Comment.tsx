import { ArrowDownIcon, ArrowUpIcon, KebabHorizontalIcon } from '@primer/octicons-react';
import { IComment } from '../lib/models/adapter';
import ReactButton from './ReactButtons';
import Reply from './Reply';

export interface ICommentProps {
  comment: IComment;
}

export default function Comment({ comment }: ICommentProps) {
  return (
    <div className="flex my-4 text-sm">
      <div className="flex-shrink-0 mr-2 w-14">
        <div className="flex flex-col">
          <button type="button">
            <ArrowUpIcon />
          </button>
          <div className="flex justify-center w-full">
            <div className="flex flex-row justify-center min-w-[26px] px-2 py-1 text-blue-900 bg-blue-400 bg-opacity-20 rounded-full">
              <div className="overflow-hidden text-xs">21</div>
            </div>
          </div>
          <button type="button">
            <ArrowDownIcon />
          </button>
        </div>
      </div>
      <div className="w-full border border-blue-400 rounded-md border-opacity-30">
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
              <div
                data-datetime={comment.createdAt}
                className="whitespace-nowrap"
                title="Mar 18, 2021, 9:25 PM GMT+7"
              >
                {comment.createdAt}
              </div>
            </a>
            <div className="hidden ml-2 text-xs sm:inline-flex">
              <span className="px-1 ml-1 border border-blue-400 rounded-md border-opacity-30">
                {comment.authorAssociation}
              </span>
            </div>
          </h3>
          <div className="flex">
            <button className="text-gray-500 hover:text-blue-600">
              <KebabHorizontalIcon />
            </button>
          </div>
        </div>
        <div className="border-b rounded-b">
          <div className="w-full p-4" dangerouslySetInnerHTML={{ __html: comment.bodyHTML }}></div>
          <div className="flex content-center justify-between">
            <div className="relative flex ml-4">
              <ReactButton reactionGroups={comment.reactions} />
            </div>
            <div className="mb-4 mr-4">
              <span className="text-xs text-gray-500">
                {comment.replyCount === 1 ? '1 reply' : `${comment.replyCount} replies`}
              </span>
            </div>
          </div>
        </div>
        <div>
          {comment.replies.map((reply) => (
            <Reply key={reply.url} reply={reply} />
          ))}
        </div>
        <div className="flex px-4 py-2 bg-gray-500 border-t bg-opacity-5">
          <a href={comment.author.url} className="flex items-center flex-shrink-0">
            <img
              className="inline-block rounded-full"
              src={comment.author.avatarUrl}
              width="30"
              height="30"
              alt={`@${comment.author.login}`}
            />
          </a>
          <button className="w-full px-2 py-1 ml-2 text-left text-gray-600 bg-white border rounded">
            Write a reply
          </button>
        </div>
      </div>
    </div>
  );
}
