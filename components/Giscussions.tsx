import { useCallback, useContext } from 'react';
import { AuthContext } from '../lib/context';
import { IComment } from '../lib/models/adapter';
import { useDiscussions } from '../services/giscussions/discussions';
import Comment from './Comment';
import CommentBox from './CommentBox';

export interface IGiscussionsProps {
  id: string;
}

export default function Giscussions({ id }: IGiscussionsProps) {
  const { token } = useContext(AuthContext);
  const { data, isLoading, isError, mutate } = useDiscussions(id, token);

  const addNewComment = useCallback(
    (comment: IComment) =>
      mutate({
        ...data,
        totalCount: data.totalCount + 1,
        comments: [...data.comments, comment],
      }),
    [data, mutate],
  );

  return (
    <div className="w-full text-gray-800">
      <div className="flex flex-wrap items-center">
        <h4 className="flex-auto my-2 mr-2 font-semibold">
          {isLoading
            ? 'Loading comments...'
            : isError
            ? 'An error occurred.'
            : `${data.totalCount} comment${data.totalCount !== 1 ? 's' : ''}`}
        </h4>
      </div>

      {data?.comments?.map((comment) => (
        <Comment key={comment.url} comment={comment} viewer={data.viewer} />
      ))}

      <div className="my-4 text-sm border-t-2"></div>

      <CommentBox />
    </div>
  );
}
