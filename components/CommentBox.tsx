import { MarkdownIcon } from '@primer/octicons-react';
import { useState } from 'react';

export default function CommentBox() {
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
