import { useCallback, useContext } from 'react';
import { AuthContext } from '../lib/context';
import { IComment, IReply } from '../lib/models/adapter';
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

  const addNewReply = useCallback(
    (reply: IReply) =>
      mutate({
        ...data,
        totalCount: data.totalCount + 1,
        comments: data.comments.map((comment) =>
          comment.id === reply.replyToId
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment,
        ),
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
        <Comment key={comment.id} comment={comment}>
          {token ? (
            <CommentBox
              discussionId={id}
              onSubmit={addNewReply}
              replyToId={comment.id}
              viewer={data.viewer}
            />
          ) : null}
        </Comment>
      ))}

      <div className="my-4 text-sm border-t-2"></div>

      <CommentBox discussionId={id} onSubmit={addNewComment} viewer={data?.viewer} />
    </div>
  );
}
