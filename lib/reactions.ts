import { IComment, IReply } from './models/adapter';

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

export function updateCommentReaction<T extends IComment | IReply = IComment>(
  comment: T,
  reaction: Reactions,
) {
  return {
    ...comment,
    reactions: {
      ...comment.reactions,
      [reaction]: {
        count: comment.reactions[reaction].viewerHasReacted
          ? comment.reactions[reaction].count - 1
          : comment.reactions[reaction].count + 1,
        viewerHasReacted: !comment.reactions[reaction].viewerHasReacted,
      },
    },
  } as T;
}
