import { ReactNode } from 'react';
import { KebabHorizontalIcon } from '@primer/octicons-react';
import ReactButton from './ReactButton';

export default function Reply({ children }: { children: ReactNode }) {
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
