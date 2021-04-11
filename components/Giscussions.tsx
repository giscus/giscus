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

  const backComments = useDiscussions(id, token, { last: 20 });
  const {
    data: _backData,
    isError: isBackError,
    isLoading: isBackLoading,
    mutators: backMutators,
  } = backComments;

  const backData = _backData && _backData[_backData.length - 1];
  const startCursor = backData?.pageInfo.startCursor;

  const frontParams = {
    first: startCursor ? 20 : 0,
    before: startCursor,
  };

  const frontComments = useDiscussions(id, token, frontParams);
  const {
    data: frontData,
    isError: isFrontError,
    isLoading: isFrontLoading,
    mutators: frontMutators,
  } = frontComments;

  const isError = isFrontError || isBackError;
  const isLoading = isFrontLoading || isBackLoading;
  const totalCount = backData?.totalCount + frontData?.reduce((prev, g) => prev + g.totalCount, 0);

  return (
    <div className="w-full text-gray-800">
      <div className="flex flex-wrap items-center">
        <h4 className="flex-auto my-2 mr-2 font-semibold">
          {isLoading
            ? 'Loading comments...'
            : isError
            ? 'An error occurred.'
            : `${totalCount} comment${totalCount !== 1 ? 's' : ''}`}
        </h4>
      </div>

      {!isLoading
        ? frontData?.map((page) =>
            page.comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onCommentUpdate={frontMutators.updateComment}
                onReplyUpdate={frontMutators.updateReply}
              >
                {token ? (
                  <CommentBox
                    discussionId={id}
                    onSubmit={frontMutators.addNewReply}
                    replyToId={comment.id}
                    viewer={frontData && frontData[0].viewer}
                  />
                ) : null}
              </Comment>
            )),
          )
        : null}

      {!isLoading
        ? backData?.comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onCommentUpdate={backMutators.updateComment}
              onReplyUpdate={backMutators.updateReply}
            >
              {token ? (
                <CommentBox
                  discussionId={id}
                  onSubmit={backMutators.addNewReply}
                  replyToId={comment.id}
                  viewer={backData?.viewer}
                />
              ) : null}
            </Comment>
          ))
        : null}

      <div className="my-4 text-sm border-t-2"></div>

      <CommentBox
        discussionId={id}
        onSubmit={backMutators.addNewComment}
        viewer={backData?.viewer}
      />
    </div>
  );
}
