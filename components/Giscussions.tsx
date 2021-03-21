import Comment from './Comment';
import CommentBox from './CommentBox';

export default function Giscussions() {
  return (
    <div className="w-full text-gray-800">
      <div className="flex flex-wrap items-center">
        <h4 className="flex-auto my-2 mr-2 font-semibold">2 comments</h4>
      </div>

      <Comment />

      <div className="my-4 text-sm border-t-2"></div>

      <CommentBox />
    </div>
  );
}
