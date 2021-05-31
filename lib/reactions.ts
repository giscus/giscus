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
  return {
    ...reactionGroups,
    [reaction]: {
      count: reactionGroups[reaction].viewerHasReacted
        ? reactionGroups[reaction].count - 1
        : reactionGroups[reaction].count + 1,
      viewerHasReacted: !reactionGroups[reaction].viewerHasReacted,
    },
  };
}

export function updateDiscussionReaction(page: IGiscussion, reaction: Reactions) {
  return {
    ...page,
    discussion: {
      ...page.discussion,
      reactions: updateReactionGroups(page.discussion.reactions, reaction),
    },
  } as IGiscussion;
}

export function updateCommentReaction<T extends IComment | IReply = IComment>(
  comment: T,
  reaction: Reactions,
) {
  return {
    ...comment,
    reactions: updateReactionGroups(comment.reactions, reaction),
  } as T;
}
