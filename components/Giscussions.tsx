import { ArrowDownIcon, ArrowUpIcon, KebabHorizontalIcon } from '@primer/octicons-react';

export default function Giscussions() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center">
        <h4 className="flex-auto my-2 mr-2 font-semibold">2 comments</h4>
      </div>
      <div className="flex p-4 text-sm">
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
              <button>
                <KebabHorizontalIcon />
              </button>
            </div>
          </div>
          <div className="border-b rounded-b">
            <div className="w-full p-4">Test comment.</div>
            <div className="flex content-center justify-between">
              <div className="ml-4">
                <button className="px-2 py-1 mb-4 mr-2 border rounded">
                  <img
                    className="inline-block mr-1"
                    alt="eyes"
                    height="16"
                    width="16"
                    src="https://github.githubassets.com/images/icons/emoji/unicode/1f440.png"
                  />
                  <span>1</span>
                </button>
              </div>
              <div className="mb-4 mr-4">
                <span className="text-xs text-gray-500">2 replies</span>
              </div>
            </div>
          </div>
          <div className="pt-2 bg-blue-900 bg-opacity-5">
            <div className="flex pt-2 pl-4">
              <div className="w-[2px] bg-gray-200 relative left-4 z-0"></div>
              <div className="z-10">
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
              <div className="w-full mb-2 ml-2">
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
                    <button>
                      <KebabHorizontalIcon />
                    </button>
                  </div>
                </div>
                <div className="">
                  <div className="w-full py-4">Test reply.</div>
                  <div className="flex content-center justify-between">
                    <div className="">
                      <button className="px-2 py-1 mb-4 mr-2 border rounded">
                        <img
                          className="inline-block mr-1"
                          alt="eyes"
                          height="16"
                          width="16"
                          src="https://github.githubassets.com/images/icons/emoji/unicode/1f440.png"
                        />
                        <span>1</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex px-4 py-2 border-t">
              <a href="https://github.com/laymonage" className="flex items-center">
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
      </div>
    </div>
  );
}
