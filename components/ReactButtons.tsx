import { SmileyIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { AuthContext, getLoginUrl } from '../lib/context';
import { useComponentVisible } from '../lib/hooks';
import { IReactionGroups } from '../lib/models/adapter';
import { Reactions } from '../lib/reactions';

export interface IReactButtonsProps {
  reactionGroups: IReactionGroups;
  variant?: 'groupsOnly' | 'popoverOnly' | 'all';
}

export default function ReactButtons({ reactionGroups, variant = 'all' }: IReactButtonsProps) {
  const [current, setCurrent] = useState('');
  const [ref, isOpen, setIsOpen] = useComponentVisible<HTMLDivElement>(false);
  const { token, origin } = useContext(AuthContext);
  const loginUrl = getLoginUrl(origin);

  function togglePopover() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {variant !== 'groupsOnly' ? (
        <div ref={ref}>
          <button
            className={`px-3 py-[3px] text-gray-900 text-opacity-75 hover:text-blue-600 ${
              variant !== 'popoverOnly' ? 'mb-4 mr-3 border rounded' : ''
            }`}
            onClick={togglePopover}
          >
            <SmileyIcon size={18} />
          </button>
          <div
            className={`absolute ${
              isOpen ? 'visible scale-100' : 'invisible scale-50'
            } ease-in-out duration-100 origin-center transform transition z-20 w-[146px] text-gray-600 bg-white border rounded popover top-8`}
          >
            <p className="m-2">
              {token ? (
                current || 'Pick your reaction'
              ) : (
                <>
                  <Link href={loginUrl}>
                    <a className="text-blue-600">Sign in</a>
                  </Link>{' '}
                  to add your reaction.
                </>
              )}
            </p>
            <div className="my-2 border-t" />
            <div className="m-2">
              {Object.entries(Reactions).map(([key, { name, emoji }]) => (
                <button
                  key={key}
                  type="button"
                  className={`w-8 h-8 gsc-emoji-button ${
                    reactionGroups[key].viewerHasReacted ? 'border bg-blue-400 bg-opacity-10' : ''
                  }`}
                  onClick={togglePopover}
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
            <style jsx>
              {`
                .popover::before {
                  position: absolute;
                  top: -16px;
                  left: 9px;
                  border: 8px solid transparent;
                  border-bottom: 8px solid lightgray;
                  content: '';
                }
                .popover::after {
                  position: absolute;
                  top: -15px;
                  left: 10px;
                  border: 7px solid transparent;
                  border-bottom: 8px solid white;
                  content: '';
                }
                .gsc-emoji-button:focus .gsc-emoji,
                .gsc-emoji-button:hover .gsc-emoji {
                  transform: scaleX(1.5) scaleY(1.5);
                }
              `}
            </style>
          </div>
        </div>
      ) : null}

      {variant !== 'popoverOnly'
        ? Object.entries(reactionGroups).map(([value, { count, viewerHasReacted }]) =>
            count > 0 ? (
              <button
                key={value}
                className={`px-2 py-[3px] mb-4 mr-2 last:mr-0 border rounded bg-opacity-10 ${
                  viewerHasReacted ? ' bg-blue-400' : ''
                }`}
                disabled={!token}
                title={`${count} ${count === 1 ? 'person' : 'people'} reacted with ${Reactions[
                  value
                ].name.toLowerCase()} emoji`}
              >
                <span className="mr-1">{Reactions[value].emoji}</span>
                <span className="text-xs text-blue-600">{count}</span>
              </button>
            ) : null,
          )
        : null}
    </>
  );
}
