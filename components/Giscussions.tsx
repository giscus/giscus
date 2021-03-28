import { useState } from 'react';
import { IGiscussion } from '../lib/models/adapter';
import { ITokenRequest, IGiscussionsRequest } from '../lib/models/services';
import { getGiscussions } from '../services/giscussions/discussions';
import { getToken } from '../services/giscussions/token';
import Comment from './Comment';
import CommentBox from './CommentBox';

export type IGiscussionsProps = ITokenRequest & IGiscussionsRequest;

export default function Giscussions(props: IGiscussionsProps) {
  const { session, ...params } = props;
  const [data, setData] = useState<IGiscussion | null>(null);

  getToken(session).then((token) => {
    getGiscussions(params, token).then((data) => setData(data));
  });

  return (
    <div className="w-full text-gray-800">
      <div className="flex flex-wrap items-center">
        <h4 className="flex-auto my-2 mr-2 font-semibold">
          {data ? `${data.totalCount} comments` : 'Loading comments...'}
        </h4>
      </div>

      {data?.comments?.map((comment) => (
        <Comment key={comment.url} comment={comment} />
      ))}

      <div className="my-4 text-sm border-t-2"></div>

      <CommentBox />
    </div>
  );
}
