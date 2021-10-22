import { Reaction } from '../../lib/reactions';
import { GITHUB_GRAPHQL_API_URL } from '../config';

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
  content: Reaction;
  subjectId: string;
}

export interface ToggleReactionResponse {
  data: {
    toggleReaction: {
      reaction: {
        content: Reaction;
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
  return fetch(GITHUB_GRAPHQL_API_URL, {
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
