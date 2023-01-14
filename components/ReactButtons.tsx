import { SmileyIcon } from '@primer/octicons-react';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../lib/context';
import { useComponentVisible } from '../lib/hooks';
import { IReactionGroups } from '../lib/types/adapter';
import { Reaction, Reactions } from '../lib/reactions';
import { toggleReaction } from '../services/github/toggleReaction';
import { Trans, useGiscusTranslation } from '../lib/i18n';

interface IReactButtonsProps {
  reactionGroups?: IReactionGroups;
  subjectId?: string;
  variant?: 'groupsOnly' | 'popoverOnly' | 'all';
  popoverPosition?: 'top' | 'bottom';
  onReact: (content: Reaction, promise: Promise<unknown>) => void;
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
  current: Reaction;
  loginUrl: string;
}) {
  const { t } = useGiscusTranslation();
  if (isLoading) return <p className="m-2">{t('pleaseWait')}</p>;
  if (!isLoggedIn)
    return (
      <p className="m-2">
        <Trans
          i18nKey="common:signInToAddYourReaction"
          components={{ a: <a href={loginUrl} className="color-text-link" target="_top" /> }}
        />
      </p>
    );
  return (
    <p className="overflow-hidden text-ellipsis whitespace-nowrap m-2">
      {current ? t(current) : t('pickYourReaction')}
    </p>
  );
}

export default function ReactButtons({
  reactionGroups,
  subjectId,
  onReact,
  variant = 'all',
  popoverPosition = 'bottom',
  onDiscussionCreateRequest,
}: IReactButtonsProps) {
  const { t } = useGiscusTranslation();
  const [current, setCurrent] = useState<Reaction | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, isOpen, setIsOpen] = useComponentVisible<HTMLDetailsElement>(false);
  const { token, origin, getLoginUrl } = useContext(AuthContext);
  const loginUrl = getLoginUrl(origin);

  const react = useCallback(
    async (content: Reaction) => {
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

  const directReactionButtons =
    variant === 'popoverOnly'
      ? []
      : Object.entries(reactionGroups || {})
          .filter(([, { count }]) => count > 0)
          .map(
            ([key, { count, viewerHasReacted }]: [Reaction, (typeof reactionGroups)[Reaction]]) => (
              <button
                key={key}
                className={`gsc-direct-reaction-button gsc-social-reaction-summary-item ${
                  viewerHasReacted ? 'has-reacted' : ''
                }${!token ? ' cursor-not-allowed' : ''}`}
                disabled={!token}
                onClick={() => react(key)}
                aria-label={
                  token
                    ? t('addTheReaction', { reaction: t(key) })
                    : t('youMustBeSignedInToAddReactions')
                }
                title={
                  token
                    ? t('peopleReactedWith', { count, reaction: t(key), emoji: t('emoji') })
                    : t('youMustBeSignedInToAddReactions')
                }
              >
                <span className="gsc-direct-reaction-button-emoji">{Reactions[key]}</span>
                <span
                  className="gsc-social-reaction-summary-item-count"
                  title={t('peopleReactedWith', { count, reaction: t(key), emoji: t('emoji') })}
                >
                  {count}
                </span>
              </button>
            ),
          );

  return (
    <>
      {variant !== 'groupsOnly' ? (
        <details
          ref={ref}
          className="gsc-reactions-menu"
          onToggle={(e) => {
            if (!(e.target instanceof HTMLDetailsElement)) return;
            setIsOpen(e.target.open);
          }}
          open={isOpen}
        >
          <summary
            aria-label={t('addReactions')}
            className={`link-secondary gsc-reactions-button gsc-social-reaction-summary-item ${
              variant === 'popoverOnly' ? 'popover-only' : ''
            }`}
          >
            <SmileyIcon size={16} />
          </summary>
          <div
            className={`color-border-primary color-text-secondary color-bg-overlay gsc-reactions-popover ${popoverPosition} ${
              isOpen ? ' open' : ''
            } ${variant === 'popoverOnly' ? 'right' : 'left'}`}
          >
            <PopupInfo
              isLoading={isSubmitting}
              isLoggedIn={!!token}
              loginUrl={loginUrl}
              current={current}
            />
            <div className="color-border-primary my-2 border-t" />
            <div className="m-2">
              {Object.entries(Reactions).map(([key, emoji]) => {
                const hasReacted = reactionGroups?.[key]?.viewerHasReacted;

                return (
                  <button
                    aria-label={t(hasReacted ? 'removeTheReaction' : 'addTheReaction', {
                      reaction: t(key as Reaction),
                    })}
                    key={key}
                    type="button"
                    className={`gsc-emoji-button${
                      hasReacted ? ' has-reacted color-bg-info color-border-tertiary' : ''
                    }${!token ? ' no-token' : ''}`}
                    onClick={() => {
                      react(key as Reaction);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setCurrent(key as Reaction)}
                    onFocus={() => setCurrent(key as Reaction)}
                    onMouseLeave={() => setCurrent(null)}
                    onBlur={() => setCurrent(null)}
                    disabled={!token}
                  >
                    <span className="gsc-emoji">{emoji}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </details>
      ) : null}

      {variant !== 'popoverOnly' ? (
        <div className="gsc-direct-reaction-buttons">{directReactionButtons}</div>
      ) : null}
    </>
  );
}
