import { ArrowUpIcon, KebabHorizontalIcon } from '@primer/octicons-react';
import { formatDistance, format } from 'date-fns';
import { IComment } from '../lib/models/adapter';
import ReactButtons from './ReactButtons';
import Reply from './Reply';

export interface ICommentProps {
  comment: IComment;
}

export default function Comment({ comment }: ICommentProps) {
  return (
    <div className="flex my-4 text-sm">
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
      <div className="w-full min-w-0 border border-blue-400 rounded-md border-opacity-30">
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
                className="whitespace-nowrap"
                title={format(new Date(comment.createdAt), 'LLL d, y, p O')}
              >
                {formatDistance(new Date(comment.createdAt), new Date(), { addSuffix: true })}
              </div>
            </a>
            <div className="hidden ml-2 text-xs sm:inline-flex">
              <span className="px-1 ml-1 capitalize border border-blue-400 rounded-md border-opacity-30">
                {comment.authorAssociation.toLowerCase()}
              </span>
            </div>
          </h3>
          <div className="flex">
            <button className="text-gray-500 hover:text-blue-600">
              <KebabHorizontalIcon />
            </button>
          </div>
        </div>
        <div className="p-4 markdown" dangerouslySetInnerHTML={{ __html: comment.bodyHTML }}></div>
        <div className="flex content-center justify-between border-b">
          <div className="relative flex mx-4">
            <ReactButtons reactionGroups={comment.reactions} />
          </div>
          <div className="mb-4 mr-4">
            <span className="text-xs text-gray-500">
              {comment.replyCount} {comment.replyCount === 1 ? 'reply' : 'replies'}
            </span>
          </div>
        </div>
        {comment.replies.length > 0 ? (
          <div className="border-b">
            {comment.replies.map((reply) => (
              <Reply key={reply.url} reply={reply} />
            ))}
          </div>
        ) : null}
        <div className="flex px-4 py-2 bg-gray-500 bg-opacity-5">
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
