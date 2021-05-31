import { IComment, IGiscussion, IReactionGroups, IReply } from './types/adapter';

export const Reactions = {
  THUMBS_UP: { name: '+1', emoji: '👍' },
  THUMBS_DOWN: { name: '-1', emoji: '👎' },
  LAUGH: { name: 'Laugh', emoji: '😆' },
  HOORAY: { name: 'Hooray', emoji: '🎉' },
  CONFUSED: { name: 'Confused', emoji: '😕' },
  HEART: { name: 'Love', emoji: '❤️' },
  ROCKET: { name: 'Rocket', emoji: '🚀' },
  EYES: { name: 'Eyes', emoji: '👀' },
} as const;

export type Reactions = keyof typeof Reactions;

function updateReactionGroups(reactionGroups: IReactionGroups, reaction: Reactions) {
  const diff = reactionGroups[reaction].viewerHasReacted ? -1 : 1;
  return [
    {
      ...reactionGroups,
      [reaction]: {
        count: reactionGroups[reaction].count + diff,
        viewerHasReacted: !reactionGroups[reaction].viewerHasReacted,
      },
    },
    diff,
  ] as [IReactionGroups, number];
}

export function updateDiscussionReaction(page: IGiscussion, reaction: Reactions) {
  const [newReactions, diff] = updateReactionGroups(page.discussion.reactions, reaction);
  return {
    ...page,
    discussion: {
      ...page.discussion,
      reactionCount: page.discussion.reactionCount + diff,
      reactions: newReactions,
    },
  } as IGiscussion;
}

export function updateCommentReaction<T extends IComment | IReply = IComment>(
  comment: T,
  reaction: Reactions,
) {
  const [newReactions] = updateReactionGroups(comment.reactions, reaction);
  return {
    ...comment,
    reactions: newReactions,
  } as T;
}
