import { ArrowDownIcon, ArrowUpIcon, KebabHorizontalIcon } from '@primer/octicons-react';

export default function Giscussions() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center">
        <h4 className="flex-auto my-2 mr-2 font-semibold">0 comments</h4>
      </div>
      <div className="flex p-4">
        <div className="flex-shrink-0 mr-2 w-14">
          <div className="flex flex-col">
            <button type="button">
              <ArrowUpIcon />
            </button>
            <div className="flex justify-center w-full">
              <div className="flex flex-row justify-center min-w-[26px] px-2 text-blue-900 bg-blue-100 rounded-full">
                <div className="overflow-hidden text-sm">21</div>
              </div>
            </div>
            <button type="button">
              <ArrowDownIcon />
            </button>
          </div>
        </div>
        <div className="w-full border border-blue-100 rounded-md">
          <div className="flex items-center px-3">
            <h3 className="flex items-center flex-auto pt-2">
              <a href="https://github.com/laymonage" className="flex items-center">
                <img
                  className="mr-2 rounded-full"
                  src="https://avatars.githubusercontent.com/u/6379424?s=60&amp;v=4"
                  width="30"
                  height="30"
                  alt="@laymonage"
                />
                <span className="text-bold">laymonage</span>
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
                <span className="px-1 ml-1 border border-blue-100 rounded-md">Maintainer</span>
                <span className="px-1 ml-1 border border-blue-100 rounded-md">Author</span>
              </div>
            </h3>
            <div className="flex">
              <button>
                <KebabHorizontalIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
