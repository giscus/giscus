import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../lib/context';
import { IGiscussion } from '../lib/models/adapter';
import { IGiscussionsRequest } from '../lib/models/giscussions';
import { getGiscussions } from '../services/giscussions/discussions';
import Comment from './Comment';
import CommentBox from './CommentBox';

export type IGiscussionsProps = IGiscussionsRequest;

export default function Giscussions(props: IGiscussionsProps) {
  const [data, setData] = useState<IGiscussion | null>(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const data = await getGiscussions(props, token);
      setData(data);
    };
    getData();
  }, [props, token]);

  return (
    <div className="w-full text-gray-800">
      <div className="flex flex-wrap items-center">
        <h4 className="flex-auto my-2 mr-2 font-semibold">
          {data
            ? `${data.totalCount} comment${data.totalCount !== 1 ? 's' : ''}`
            : 'Loading comments...'}
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
