import {
  ArrowDownIcon,
  ArrowUpIcon,
  KebabHorizontalIcon,
  MarkdownIcon,
  SmileyIcon,
} from '@primer/octicons-react';
import { ReactNode, useState } from 'react';

function ReactButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="px-3 py-1 mb-4 mr-3 text-gray-900 text-opacity-75 border rounded hover:text-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <SmileyIcon />
      </button>
      <div
        className={`absolute ${
          isOpen ? 'visible scale-100' : 'invisible scale-50'
        } ease-in-out duration-100 origin-center transform transition z-20 w-[146px] text-gray-600 bg-white border rounded popover top-8`}
      >
        <p className="m-2">Pick your reaction</p>
        <div className="my-2 border-t" />
        <div className="m-2">
          <button type="button" className="w-8 h-8 transform focus:scale-150 hover:scale-150">
            👍
          </button>
          <button type="button" className="w-8 h-8 transform focus:scale-150 hover:scale-150">
            👎
          </button>
          <button type="button" className="w-8 h-8 transform focus:scale-150 hover:scale-150">
            😆
          </button>
          <button type="button" className="w-8 h-8 transform focus:scale-150 hover:scale-150">
            🎉
          </button>
          <button type="button" className="w-8 h-8 transform focus:scale-150 hover:scale-150">
            😕
          </button>
          <button type="button" className="w-8 h-8 transform focus:scale-150 hover:scale-150">
            ❤️
          </button>
          <button type="button" className="w-8 h-8 transform focus:scale-150 hover:scale-150">
            🚀
          </button>
          <button type="button" className="w-8 h-8 transform focus:scale-150 hover:scale-150">
            👀
          </button>
        </div>
        <style jsx>
          {`
            .popover::before {
              position: absolute;
              top: -16px;
              left: 9px;
              border: 8px solid transparent;
              border-bottom: 8px solid lightgray;
              content: '';
            }
            .popover::after {
              position: absolute;
              top: -15px;
              left: 10px;
              border: 7px solid transparent;
              border-bottom: 8px solid white;
              content: '';
            }
          `}
        </style>
      </div>
    </>
  );
}

function Reply({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative pt-2 bg-gray-500 bg-opacity-5 gsc-reply">
        <div className="w-[2px] flex-shrink-0 bg-gray-500 bg-opacity-10 absolute left-[30px] z-20 h-full top-0 gsc-tl-line">
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
            <a href="https://github.com/laymonage" className="flex items-center">
              <img
                className="rounded-full"
                src="https://avatars.githubusercontent.com/u/6379424?s=60&amp;v=4"
                width="30"
                height="30"
                alt="@laymonage"
              />
            </a>
          </div>
          <div className="w-full ml-2">
            <div className="flex">
              <h3 className="flex items-center flex-auto pt-1">
                <a href="https://github.com/laymonage" className="flex items-center">
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
              <div className="flex mr-4">
                <button className="text-gray-500 hover:text-blue-600">
                  <KebabHorizontalIcon />
                </button>
              </div>
            </div>
            <div className="">
              <div className="w-full py-4">{children}</div>
              <div className="relative flex content-center">
                <ReactButton />
                <button className="px-2 py-1 mb-4 mr-2 bg-blue-400 border rounded bg-opacity-10">
                  <span className="mr-1">👀</span>
                  <span className="text-xs text-blue-600">1</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CommentBox() {
  const [isPreview, setIsPreview] = useState(false);
  return (
    <div className="text-sm border rounded">
      <div className="flex bg-gray-500 border-b rounded-t bg-opacity-5">
        <div className="mx-2 mb-[-1px] mt-2">
          <button
            className={`px-4 py-2 border border-b-0 focus:outline-none ${
              !isPreview
                ? 'text-gray-700 bg-white border border-b-0 rounded-t'
                : 'text-gray-500 border-transparent'
            }`}
            onClick={() => setIsPreview(false)}
          >
            Write
          </button>
          <button
            className={`px-4 py-2 border border-b-0 focus:outline-none ml-1 ${
              isPreview ? 'text-gray-700 bg-white rounded-t' : 'text-gray-500 border-transparent'
            }`}
            onClick={() => setIsPreview(true)}
          >
            Preview
          </button>
        </div>
      </div>
      <div className="m-2">
        {isPreview ? (
          <div className="px-2 pt-2 pb-4 min-h-[105px] border-b-2">Nothing to preview</div>
        ) : (
          <textarea
            className="w-full p-2 border rounded min-h-[100px]"
            placeholder="Write a comment"
          ></textarea>
        )}
      </div>
      <div className="flex items-center justify-between m-2 text-gray-500 hover:text-blue-600">
        <a
          className="text-xs"
          rel="nofollow noopener noreferrer"
          target="_blank"
          href="https://guides.github.com/features/mastering-markdown/"
        >
          <MarkdownIcon className="mr-1" />
          Styling with Markdown is supported
        </a>
        <button className="px-4 py-[5px] ml-1 text-white bg-[#2ea44f] rounded-md">Comment</button>
      </div>
    </div>
  );
}

export default function Giscussions() {
  return (
    <div className="w-full text-gray-800">
      <div className="flex flex-wrap items-center">
        <h4 className="flex-auto my-2 mr-2 font-semibold">2 comments</h4>
      </div>
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
              <div className="relative ml-4">
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

      <div className="my-4 text-sm border-t-2"></div>

      <CommentBox />
    </div>
  );
}
