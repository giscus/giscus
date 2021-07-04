import { MarkdownIcon } from '@primer/octicons-react';
import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { adaptComment, adaptReply, handleCommentClick, processCommentBody } from '../lib/adapter';
import { AuthContext } from '../lib/context';
import { IComment, IReply, IUser } from '../lib/types/adapter';
import { resizeTextArea } from '../lib/utils';
import { addDiscussionComment } from '../services/github/addDiscussionComment';
import { addDiscussionReply } from '../services/github/addDiscussionReply';
import { renderMarkdown } from '../services/github/markdown';

interface CommentBoxProps {
  viewer?: IUser;
  discussionId?: string;
  context?: string;
  replyToId?: string;
  onSubmit: (comment: IComment | IReply) => void;
  onReplyOpen?: VoidFunction;
  onDiscussionCreateRequest?: () => Promise<string>;
}

export default function CommentBox({
  viewer,
  discussionId,
  context,
  replyToId,
  onSubmit,
  onReplyOpen,
  onDiscussionCreateRequest,
}: CommentBoxProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [input, setInput] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const { token, origin, getLoginUrl } = useContext(AuthContext);
  const loginUrl = getLoginUrl(origin);
  const isReply = !!replyToId;

  useEffect(() => {
    if (isPreview && input !== lastInput) {
      if (input) {
        setIsLoading(true);
        renderMarkdown(input, token, context).then((value) => {
          const processed = processCommentBody(value);
          setPreview(processed);
          setIsLoading(false);
        });
      }
      setLastInput(input);
    }
  }, [isPreview, input, lastInput, token, context]);

  const reset = useCallback(() => {
    setInput('');
    setPreview('');
    setIsPreview(false);
    setIsSubmitting(false);
    setIsReplyOpen(false);
  }, []);

  const handleClick = useCallback(async () => {
    if (isSubmitting || (!discussionId && !onDiscussionCreateRequest)) return;
    setIsSubmitting(true);

    const id = discussionId ? discussionId : await onDiscussionCreateRequest();
    const payload = { body: input, discussionId: id, replyToId };

    if (replyToId) {
      addDiscussionReply(payload, token).then(({ data: { addDiscussionReply } }) => {
        const { reply } = addDiscussionReply;
        const adapted = adaptReply(reply);

        onSubmit(adapted);
        reset();
      });
    } else {
      addDiscussionComment(payload, token).then(({ data: { addDiscussionComment } }) => {
        const { comment } = addDiscussionComment;
        const adapted = adaptComment(comment);

        onSubmit(adapted);
        reset();
      });
    }
  }, [
    isSubmitting,
    discussionId,
    input,
    replyToId,
    onDiscussionCreateRequest,
    token,
    onSubmit,
    reset,
  ]);

  const handleReplyOpen = useCallback(() => {
    onReplyOpen();
    setIsReplyOpen(true);
  }, [onReplyOpen]);

  const handleTextAreaChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    const elem = event.target as HTMLTextAreaElement;
    resizeTextArea(elem);
  }, []);

  const handleTextAreaRef = useCallback(
    (textarea: HTMLTextAreaElement) => {
      if (!textarea) return;
      resizeTextArea(textarea);
      if (isReply) setTimeout(() => textarea.focus());
    },
    [isReply],
  );

  return !isReply || isReplyOpen ? (
    <div
      className={`w-full text-sm color-bg-primary color-border-primary gsc-comment-box${
        replyToId ? '' : ' border rounded'
      }`}
    >
      <div className="flex border-b rounded-t color-bg-tertiary color-border-primary gsc-comment-box-tabs">
        <div className="mx-2 mb-[-1px] mt-2">
          <button
            className={`px-4 py-2 border border-b-0 focus:outline-none ${
              !isPreview
                ? 'color-text-primary color-bg-canvas rounded-t color-border-primary'
                : 'color-text-secondary border-transparent'
            }`}
            onClick={() => setIsPreview(false)}
          >
            Write
          </button>
          <button
            className={`px-4 py-2 border border-b-0 focus:outline-none ml-1 ${
              isPreview
                ? 'color-text-primary color-bg-canvas rounded-t color-border-primary'
                : 'color-text-secondary border-transparent'
            }`}
            onClick={() => setIsPreview(true)}
          >
            Preview
          </button>
        </div>
      </div>
      <div className="m-2 gsc-comment-box-main">
        {isPreview ? (
          <div
            className="px-2 pt-2 pb-4 min-h-[105px] border-b-2 markdown color-border-primary gsc-comment-box-preview"
            dangerouslySetInnerHTML={
              isLoading ? undefined : { __html: preview || 'Nothing to preview' }
            }
            onClick={handleCommentClick}
          >
            {isLoading ? 'Loading preview...' : undefined}
          </div>
        ) : (
          <textarea
            className="w-full p-2 border rounded min-h-[100px] disabled:cursor-not-allowed form-control input-contrast gsc-comment-box-textarea"
            placeholder={token ? 'Write a comment' : 'Sign in to comment'}
            onChange={handleTextAreaChange}
            value={input}
            disabled={!token || isSubmitting}
            ref={handleTextAreaRef}
            onKeyDown={(event) => event.ctrlKey && event.key === 'Enter' && handleClick()}
          ></textarea>
        )}
      </div>
      <div className="flex items-center justify-between m-2 gsc-comment-box-bottom">
        <a
          className="text-xs hover:no-underline Link--secondary gsc-comment-box-markdown-hint"
          rel="nofollow noopener noreferrer"
          target="_blank"
          href="https://guides.github.com/features/mastering-markdown/"
        >
          <MarkdownIcon className="mr-1" />
          Styling with Markdown is supported
        </a>
        <div className="inline-flex flex-shrink-0 gsc-comment-box-buttons">
          {isReply ? (
            <button
              className="px-4 py-[5px] ml-1 border rounded-md btn"
              onClick={() => setIsReplyOpen(false)}
            >
              Cancel
            </button>
          ) : null}
          {token ? (
            <button
              className="px-4 py-[5px] ml-1 border rounded-md items-center btn btn-primary"
              onClick={handleClick}
              disabled={(token && !input.trim()) || isSubmitting}
            >
              {isReply ? 'Reply' : 'Comment'}
            </button>
          ) : (
            <a
              className="px-4 py-[5px] ml-1 border hover:no-underline rounded-md inline-flex items-center btn btn-primary"
              target="_top"
              href={loginUrl}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 11.493 11.209"
                className="mr-2"
              >
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M5.746 0A5.747 5.747 0 003.93 11.2c.287.052.392-.125.392-.278 0-.136-.005-.497-.008-.977-1.598.347-1.935-.77-1.935-.77-.262-.664-.639-.841-.639-.841-.521-.356.04-.35.04-.35.577.041.88.593.88.593.513.878 1.345.625 1.673.477.052-.37.2-.624.364-.768-1.276-.145-2.617-.638-2.617-2.84 0-.627.224-1.14.591-1.542-.059-.145-.256-.73.057-1.52 0 0 .482-.155 1.58.589.458-.128.95-.192 1.438-.194.489.002.98.066 1.44.194 1.096-.744 1.578-.59 1.578-.59.313.791.116 1.376.057 1.521.369.402.59.915.59 1.542 0 2.208-1.343 2.694-2.623 2.836.206.177.39.528.39 1.064 0 .768-.007 1.388-.007 1.576 0 .154.104.333.395.277A5.749 5.749 0 005.746 0"
                />
              </svg>{' '}
              Sign in with GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex px-4 py-2 color-bg-tertiary rounded-b-md gsc-reply-box">
      {viewer ? (
        <a
          rel="nofollow noopener noreferrer"
          target="_blank"
          href={viewer.url}
          className="flex items-center flex-shrink-0"
        >
          <img
            className="inline-block rounded-full"
            src={viewer.avatarUrl}
            width="30"
            height="30"
            alt={`@${viewer.login}`}
          />
        </a>
      ) : null}
      <button
        className="w-full px-2 py-1 ml-2 text-left border rounded cursor-text form-control color-text-secondary color-border-primary"
        onClick={handleReplyOpen}
      >
        Write a reply
      </button>
    </div>
  );
}
