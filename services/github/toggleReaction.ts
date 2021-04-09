import { Reactions } from '../../lib/reactions';

const TOGGLE_REACTION_QUERY = (mode: 'add' | 'remove') => `
  mutation($content: ReactionContent!, $subjectId: ID!) {
    toggleReaction: ${mode}Reaction(input: {content: $content, subjectId: $subjectId}) {
      reaction {
        content
        id
      }
    }
  }`;

export interface ToggleReactionBody {
  content: Reactions;
  subjectId: string;
}

export interface ToggleReactionResponse {
  data: {
    toggleReaction: {
      reaction: {
        content: Reactions;
        id: string;
      };
    };
  };
}

export async function toggleReaction(
  params: ToggleReactionBody,
  token: string,
  viewerHasReacted: boolean,
): Promise<ToggleReactionResponse> {
  return fetch('/api/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: TOGGLE_REACTION_QUERY(viewerHasReacted ? 'remove' : 'add'),
      variables: params,
    }),
  }).then((r) => r.json());
}
