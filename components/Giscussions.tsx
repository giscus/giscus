import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';
import { IGiscussion } from '../lib/models/adapter';
import { GetDiscussionsParams } from '../services/github/getDiscussions';
import Comment from './Comment';
import CommentBox from './CommentBox';

export default function Giscussions({ discussionNumber, ...rest }: GetDiscussionsParams) {
  const params = { discussionNumber: `${discussionNumber}`, ...rest };
  const urlParams = new URLSearchParams(params);

  const { data } = useSWR<IGiscussion>(`/api/discussions?${urlParams}`, fetcher);

  return (
    <div className="w-full text-gray-800">
      <div className="flex flex-wrap items-center">
        <h4 className="flex-auto my-2 mr-2 font-semibold">{data?.totalCount} comments</h4>
      </div>

      {data?.comments.map((comment) => (
        <Comment key={comment.url} comment={comment} />
      ))}

      <div className="my-4 text-sm border-t-2"></div>

      <CommentBox />
    </div>
  );
}
