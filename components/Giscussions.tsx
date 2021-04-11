import { useContext } from 'react';
import { AuthContext } from '../lib/context';
import { useDiscussions } from '../services/giscussions/discussions';
import Comment from './Comment';
import CommentBox from './CommentBox';

export interface IGiscussionsProps {
  id: string;
}

export default function Giscussions({ id }: IGiscussionsProps) {
  const { token } = useContext(AuthContext);
  const { data, isLoading, isError, mutators } = useDiscussions(id, token);
  const { addNewComment, addNewReply, updateComment, updateReply } = mutators;

  return (
    <div className="w-full text-gray-800">
      <div className="flex flex-wrap items-center">
        <h4 className="flex-auto my-2 mr-2 font-semibold">
          {isLoading
            ? 'Loading comments...'
            : isError
            ? 'An error occurred.'
            : `${data[data.length - 1].totalCount} comment${
                data[data.length - 1].totalCount !== 1 ? 's' : ''
              }`}
        </h4>
      </div>

      {data?.map((page) =>
        page.comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onCommentUpdate={updateComment}
            onReplyUpdate={updateReply}
          >
            {token ? (
              <CommentBox
                discussionId={id}
                onSubmit={addNewReply}
                replyToId={comment.id}
                viewer={page.viewer}
              />
            ) : null}
          </Comment>
        )),
      )}

      <div className="my-4 text-sm border-t-2"></div>

      <CommentBox
        discussionId={id}
        onSubmit={addNewComment}
        viewer={data && data[data.length - 1].viewer}
      />
    </div>
  );
}
