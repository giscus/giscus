import { SmileyIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { useCallback, useContext, useState } from 'react';
import { AuthContext, getLoginUrl } from '../lib/context';
import { useComponentVisible } from '../lib/hooks';
import { IReactionGroups } from '../lib/types/adapter';
import { Reactions } from '../lib/reactions';
import { toggleReaction } from '../services/github/toggleReaction';

interface IReactButtonsProps {
  reactionGroups: IReactionGroups;
  subjectId: string;
  onReact: (content: Reactions, promise: Promise<unknown>) => void;
  variant?: 'groupsOnly' | 'popoverOnly' | 'all';
}

export default function ReactButtons({
  reactionGroups,
  subjectId,
  onReact,
  variant = 'all',
}: IReactButtonsProps) {
  const [current, setCurrent] = useState('');
  const [ref, isOpen, setIsOpen] = useComponentVisible<HTMLDivElement>(false);
  const { token, origin } = useContext(AuthContext);
  const loginUrl = getLoginUrl(origin);

  const togglePopover = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

  const react = useCallback(
    (content: Reactions) => {
      onReact(
        content,
        toggleReaction({ content, subjectId }, token, reactionGroups[content].viewerHasReacted),
      );
    },
    [onReact, reactionGroups, subjectId, token],
  );

  return (
    <>
      {variant !== 'groupsOnly' ? (
        <div ref={ref} className="relative">
          <button
            className={`px-3 py-[3px] Link--secondary${
              variant !== 'popoverOnly'
                ? ' mb-4 mr-4 border rounded-md color-bg-tertiary color-border-primary'
                : ''
            }`}
            onClick={togglePopover}
          >
            <SmileyIcon size={18} />
          </button>
          <div
            className={`absolute ${isOpen ? 'visible scale-100' : 'invisible scale-50'} ${
              variant === 'popoverOnly' ? 'popover-only right-0' : 'popover'
            } ease-in-out duration-100 origin-center transform transition z-20 w-[146px] color-text-secondary color-bg-overlay border rounded top-10 color-border-primary`}
          >
            <p className="m-2">
              {token ? (
                current || 'Pick your reaction'
              ) : (
                <>
                  <Link href={loginUrl}>
                    <a className="color-text-link" target="_top">
                      Sign in
                    </a>
                  </Link>{' '}
                  to add your reaction.
                </>
              )}
            </p>
            <div className="my-2 border-t color-border-primary" />
            <div className="m-2">
              {Object.entries(Reactions).map(([key, { name, emoji }]) => (
                <button
                  key={key}
                  type="button"
                  className={`w-8 h-8 mr-[-1px] mt-[-1px] rounded-none gsc-emoji-button ${
                    reactionGroups[key].viewerHasReacted
                      ? 'border color-bg-info color-border-tertiary'
                      : ''
                  }`}
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
        <div className="flex flex-wrap">
          {Object.entries(reactionGroups).map(([value, { count, viewerHasReacted }]) =>
            count > 0 ? (
              <button
                key={value}
                className={`px-2 mb-1 md:mb-4 mr-2 border leading-[26px] color-border-primary rounded-md${
                  viewerHasReacted ? ' color-bg-info' : ''
                }`}
                disabled={!token}
                title={`${count} ${count === 1 ? 'person' : 'people'} reacted with ${Reactions[
                  value
                ].name.toLowerCase()} emoji`}
                onClick={() => react(value as Reactions)}
              >
                <span className="inline-block w-4 h-4 mr-2">{Reactions[value].emoji}</span>
                <span className="text-xs color-text-link">{count}</span>
              </button>
            ) : null,
          )}
        </div>
      ) : null}
    </>
  );
}
