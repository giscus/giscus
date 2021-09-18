import { SmileyIcon } from '@primer/octicons-react';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../lib/context';
import { useComponentVisible } from '../lib/hooks';
import { IReactionGroups } from '../lib/types/adapter';
import { Reactions } from '../lib/reactions';
import { toggleReaction } from '../services/github/toggleReaction';

interface IReactButtonsProps {
  reactionGroups?: IReactionGroups;
  subjectId?: string;
  onReact: (content: Reactions, promise: Promise<unknown>) => void;
  variant?: 'groupsOnly' | 'popoverOnly' | 'all';
  onDiscussionCreateRequest?: () => Promise<string>;
}

function PopupInfo({
  isLoggedIn,
  isLoading,
  current,
  loginUrl,
}: {
  isLoggedIn: boolean;
  isLoading: boolean;
  current: string;
  loginUrl: string;
}) {
  if (isLoading) return <>Please wait...</>;
  if (isLoggedIn) return <>{current || 'Pick your reaction'}</>;
  return (
    <>
      <a href={loginUrl} className="color-text-link" target="_top">
        Sign in
      </a>{' '}
      to add your reaction.
    </>
  );
}

export default function ReactButtons({
  reactionGroups,
  subjectId,
  onReact,
  variant = 'all',
  onDiscussionCreateRequest,
}: IReactButtonsProps) {
  const [current, setCurrent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, isOpen, setIsOpen] = useComponentVisible<HTMLDivElement>(false);
  const { token, origin, getLoginUrl } = useContext(AuthContext);
  const loginUrl = getLoginUrl(origin);

  const togglePopover = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

  const react = useCallback(
    async (content: Reactions) => {
      if (isSubmitting || (!subjectId && !onDiscussionCreateRequest)) return;
      setIsSubmitting(!subjectId);

      const id = subjectId ? subjectId : await onDiscussionCreateRequest();

      onReact(
        content,
        toggleReaction(
          { content, subjectId: id },
          token,
          !!reactionGroups?.[content]?.viewerHasReacted,
        ).then(() => setIsSubmitting(false)),
      );
    },
    [isSubmitting, onDiscussionCreateRequest, onReact, reactionGroups, subjectId, token],
  );

  const createReactionButton = useCallback(
    ([value, { count, viewerHasReacted }]: [
      keyof IReactionGroups,
      typeof reactionGroups[keyof IReactionGroups],
    ]) => (
      <button
        aria-label={`Add ${Reactions[value].name} reaction`}
        key={value}
        className={`gsc-direct-reaction-button gsc-social-reaction-summary-item ${
          viewerHasReacted ? 'has-reacted' : ''
        }${!token ? ' cursor-not-allowed' : ''}`}
        disabled={!token}
        title={
          token
            ? `${count} ${count === 1 ? 'person' : 'people'} reacted with ${Reactions[
                value
              ].name.toLowerCase()} emoji`
            : 'You must be signed in to add reactions.'
        }
        onClick={() => react(value as Reactions)}
      >
        <span className="inline-block w-4 h-4">{Reactions[value].emoji}</span>
        <span className="text-xs ml-[2px] px-1">{count}</span>
      </button>
    ),
    [react, token],
  );

  const directReactionButtons =
    variant !== 'popoverOnly'
      ? Object.entries(reactionGroups || {})
          .filter(([, { count }]) => count > 0)
          .map(createReactionButton)
      : [];

  return (
    <>
      {variant !== 'groupsOnly' ? (
        <div ref={ref} className="gsc-reactions-menu">
          <button
            aria-label="Add reactions"
            className={`Link--secondary gsc-reactions-button gsc-social-reaction-summary-item ${
              variant === 'popoverOnly' ? 'popover-only' : 'popover'
            }`}
            onClick={togglePopover}
          >
            <SmileyIcon size={16} />
          </button>
          <div
            className={`color-border-primary color-text-secondary color-bg-overlay gsc-reactions-popover ${
              isOpen ? ' open' : ''
            } ${variant === 'popoverOnly' ? 'popover-only' : 'popover'}`}
          >
            <p className="m-2">
              <PopupInfo
                isLoading={isSubmitting}
                isLoggedIn={!!token}
                loginUrl={loginUrl}
                current={current}
              />
            </p>
            <div className="my-2 border-t color-border-primary" />
            <div className="m-2">
              {Object.entries(Reactions).map(([key, { name, emoji }]) => (
                <button
                  aria-label={`Add ${name} reaction`}
                  key={key}
                  type="button"
                  className={`gsc-emoji-button${
                    reactionGroups?.[key]?.viewerHasReacted
                      ? ' has-reacted color-bg-info color-border-tertiary'
                      : ''
                  }${!token ? ' no-token' : ''}`}
                  onClick={() => {
                    react(key as Reactions);
                    togglePopover();
                  }}
                  onMouseEnter={() => setCurrent(name)}
                  onFocus={() => setCurrent(name)}
                  onMouseLeave={() => setCurrent('')}
                  onBlur={() => setCurrent('')}
                  disabled={!token}
                >
                  <span className="gsc-emoji">{emoji}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {variant !== 'popoverOnly' ? (
        <div className="gsc-direct-reaction-buttons">{directReactionButtons}</div>
      ) : null}
    </>
  );
}
