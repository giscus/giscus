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
        key={value}
        className={`px-2 mb-1 dmd:mb-4 mr-2 border leading-[26px] color-border-primary rounded-md${
          viewerHasReacted ? ' color-bg-info' : ''
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
        <span className="inline-block w-4 h-4 mr-2">{Reactions[value].emoji}</span>
        <span className="text-xs color-text-link">{count}</span>
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
        <div ref={ref} className="relative gsc-reactions-menu">
          <button
            className={`px-3 py-[3px] Link--secondary gsc-reactions-button${
              variant !== 'popoverOnly'
                ? ' mb-1 dmd:mb-4 border rounded-md color-bg-tertiary color-border-primary'
                : ''
            }${directReactionButtons.length > 0 ? ' mr-4' : ''}`}
            onClick={togglePopover}
          >
            <SmileyIcon size={18} />
          </button>
          <div
            className={`absolute ${isOpen ? 'visible scale-100' : 'invisible scale-50'} ${
              variant === 'popoverOnly' ? 'popover-only right-0' : 'popover'
            } ease-in-out duration-100 origin-center transform transition z-20 w-[146px] color-text-secondary color-bg-overlay border rounded top-10 color-border-primary gsc-reactions-popover`}
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
                  key={key}
                  type="button"
                  className={`w-8 h-8 mr-[-1px] mt-[-1px] rounded-none gsc-emoji-button${
                    reactionGroups?.[key]?.viewerHasReacted
                      ? ' border color-bg-info color-border-tertiary'
                      : ''
                  }${!token ? ' cursor-not-allowed' : ''}`}
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
                  <span className="inline-block transition-transform gsc-emoji">{emoji}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {variant !== 'popoverOnly' ? (
        <div className="flex flex-wrap gsc-direct-reaction-buttons">{directReactionButtons}</div>
      ) : null}
    </>
  );
}
