import { ArrowDownIcon, ArrowUpIcon, KebabHorizontalIcon } from '@primer/octicons-react';
import ReactButton from './ReactButton';
import Reply from './Reply';

export default function Comment() {
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
            <a href="https://github.com/laymonage" className="flex items-center">
              <img
                className="mr-2 rounded-full"
                src="https://avatars.githubusercontent.com/u/6379424?s=60&amp;v=4"
                width="30"
                height="30"
                alt="@laymonage"
              />
              <span className="font-semibold">laymonage</span>
            </a>
            <a
              href="#discussioncomment-123"
              id="discussioncomment-123-permalink"
              className="ml-2 text-gray-500"
            >
              <div
                data-datetime="2021-03-18T14:25:14Z"
                className="whitespace-nowrap"
                title="Mar 18, 2021, 9:25 PM GMT+7"
              >
                2 hours ago
              </div>
            </a>
            <div className="hidden ml-2 text-xs sm:inline-flex">
              <span className="px-1 ml-1 border border-blue-400 rounded-md border-opacity-30">
                Maintainer
              </span>
              <span className="px-1 ml-1 border border-blue-400 rounded-md border-opacity-30">
                Author
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
          <div className="w-full p-4">Test comment.</div>
          <div className="flex content-center justify-between">
            <div className="relative flex ml-4">
              <ReactButton />
              <button className="px-2 py-1 mb-4 mr-2 bg-blue-400 border rounded bg-opacity-10">
                <span className="mr-1">👀</span>
                <span className="text-xs text-blue-700">1</span>
              </button>
            </div>
            <div className="mb-4 mr-4">
              <span className="text-xs text-gray-500">2 replies</span>
            </div>
          </div>
        </div>
        <div>
          <Reply>Test reply.</Reply>
          <Reply>Test reply again.</Reply>
        </div>
        <div className="flex px-4 py-2 bg-gray-500 border-t bg-opacity-5">
          <a href="https://github.com/laymonage" className="flex items-center flex-shrink-0">
            <img
              className="inline-block rounded-full"
              src="https://avatars.githubusercontent.com/u/6379424?s=60&amp;v=4"
              width="30"
              height="30"
              alt="@laymonage"
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
