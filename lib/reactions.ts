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
