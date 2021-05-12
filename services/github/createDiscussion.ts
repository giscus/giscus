import { GCreateDiscussionInput } from '../../lib/types/github';
import { getAppAccessToken } from './getAppAccessToken';

const GITHUB_API_URL = 'https://api.github.com/graphql';

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
  repoWithOwner: string,
  params: CreateDiscussionBody,
): Promise<CreateDiscussionResponse> {
  return fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await getAppAccessToken(repoWithOwner)}`,
      'Content-Type': 'application/json',
      'GraphQL-Features': 'discussions_api',
    },
    body: JSON.stringify({
      query: CREATE_DISCUSSION_QUERY,
      variables: params,
    }),
  }).then((r) => r.json());
}
