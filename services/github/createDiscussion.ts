import { GCreateDiscussionInput } from '../../lib/types/github';
import { GITHUB_GRAPHQL_API_URL } from '../config';

const CREATE_DISCUSSION_QUERY = `
  mutation($input: CreateDiscussionInput!) {
    createDiscussion(input: $input) {
      discussion {
        id
      }
    }
  }`;

export interface CreateDiscussionBody {
  input: GCreateDiscussionInput;
}

export interface CreateDiscussionResponse {
  data: {
    createDiscussion: {
      discussion: {
        id: string;
      };
    };
  };
}

export async function createDiscussion(
  token: string,
  params: CreateDiscussionBody,
): Promise<CreateDiscussionResponse> {
  return fetch(GITHUB_GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: CREATE_DISCUSSION_QUERY,
      variables: params,
    }),
  }).then((r) => r.json());
}
