import { useContext, useRef } from 'react';
import { AuthContext } from '../lib/context';
import { useDiscussions } from '../services/giscussions/discussions';
import Comment from './Comment';
import CommentBox from './CommentBox';

export interface IGiscussionsProps {
  repo: string;
  term: string;
}

export default function Giscussions({ repo, term }: IGiscussionsProps) {
  const { token } = useContext(AuthContext);
  const query = { repo, term };

  const backComments = useDiscussions(query, token, { last: 15 });
  const {
    data: _backData,
    isError: isBackError,
    isLoading: isBackLoading,
    mutators: backMutators,
  } = backComments;

  const backData = _backData && _backData[_backData.length - 1];
  const startCursor = useRef('');
  if (!startCursor.current && backData?.discussion?.pageInfo?.startCursor)
    startCursor.current = backData?.discussion?.pageInfo?.startCursor;

  const frontParams = {
    first: startCursor.current ? 15 : 0,
    before: startCursor.current,
  };

  const frontComments = useDiscussions(query, token, frontParams);
  const {
    data: frontData,
    isError: isFrontError,
    isLoading: isFrontLoading,
    mutators: frontMutators,
    size,
    setSize,
  } = frontComments;

  const numHidden =
    backData?.discussion?.totalCount -
    backData?.discussion?.comments.length -
    frontData?.reduce((prev, g) => prev + g.discussion.comments.length, 0);

  const isError = isFrontError || isBackError;
  const isLoading = isFrontLoading || isBackLoading;
  const isLoadingMore = isFrontLoading || (size > 0 && !frontData?.[size - 1]);

  const isNotFound = !isBackLoading && !backData?.discussion;

  const totalCountWithReplies =
    backData?.discussion?.totalCountWithReplies +
    frontData?.reduce((prev, g) => prev + g.discussion.totalCountWithReplies, 0);

  const context = backData?.discussion?.repository?.nameWithOwner;

  return (
    <div className="w-full text-gray-800">
      <div className="flex flex-wrap items-center">
        <h4 className="flex-auto my-2 mr-2 font-semibold">
          {isNotFound
            ? 'Discussion not found.'
            : isLoading
            ? 'Loading comments...'
            : isError
            ? 'An error occurred.'
            : `${totalCountWithReplies}${numHidden > 0 ? '+' : ''} comment${
                totalCountWithReplies !== 1 ? 's' : ''
              }`}
        </h4>
      </div>

      {!isLoading
        ? frontData?.map((page) =>
            page.discussion.comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onCommentUpdate={frontMutators.updateComment}
                onReplyUpdate={frontMutators.updateReply}
              >
                {token ? (
                  <CommentBox
                    discussionId={backData?.discussion?.id}
                    context={context}
                    onSubmit={frontMutators.addNewReply}
                    replyToId={comment.id}
                    viewer={frontData && frontData[0].viewer}
                  />
                ) : null}
              </Comment>
            )),
          )
        : null}

      {numHidden > 0 ? (
        <div
          className="flex justify-center py-2 my-4 bg-center bg-repeat-x"
          style={{
            backgroundImage:
              'url(https://github.com/images/modules/pulls/progressive-disclosure-line.svg)',
          }}
        >
          <button
            className="flex flex-col items-center px-6 py-2 text-sm bg-white border rounded"
            onClick={() => setSize(size + 1)}
            disabled={isLoadingMore}
          >
            <span>
              {numHidden} hidden item{numHidden !== 1 ? 's' : ''}
            </span>
            <span className="font-semibold text-blue-700">
              {isLoadingMore ? 'Loading' : 'Load more'}...
            </span>
          </button>
        </div>
      ) : null}

      {!isLoading
        ? backData?.discussion?.comments?.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onCommentUpdate={backMutators.updateComment}
              onReplyUpdate={backMutators.updateReply}
            >
              {token ? (
                <CommentBox
                  discussionId={backData?.discussion?.id}
                  context={context}
                  onSubmit={backMutators.addNewReply}
                  replyToId={comment.id}
                  viewer={backData?.viewer}
                />
              ) : null}
            </Comment>
          ))
        : null}

      <div className="my-4 text-sm border-t-2" />

      {!isLoading ? (
        <CommentBox
          discussionId={backData?.discussion?.id}
          context={context}
          onSubmit={backMutators.addNewComment}
          viewer={backData?.viewer}
        />
      ) : null}
    </div>
  );
}
