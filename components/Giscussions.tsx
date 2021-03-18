import { ArrowDownIcon, ArrowUpIcon } from '@primer/octicons-react';

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
      </div>
    </div>
  );
}
