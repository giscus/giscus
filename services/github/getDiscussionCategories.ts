import { GDiscussionCategory, GError } from '../../lib/types/github';

const GITHUB_API_URL = 'https://api.github.com/graphql';

const GET_DISCUSSION_CATEGORIES_QUERY = `
  query($query: String!) {
    search(type: REPOSITORY query: $query first:1) {
      nodes {
        ... on Repository {
          id
          discussionCategories(first: 100) {
            nodes {
              id
              name
              emojiHTML
            }
          }
        }
      }
    }
  }`;

export interface GetDiscussionCategoriesParams {
  repo: string;
}

export interface GetDiscussionCategoriesResponse {
  data: {
    search: {
      nodes: Array<{
        id: string;
        discussionCategories: {
          nodes: GDiscussionCategory[];
        };
      }>;
    };
  };
}

export async function getDiscussionCategories(
  params: GetDiscussionCategoriesParams,
  token: string,
): Promise<GetDiscussionCategoriesResponse | GError> {
  const query = `repo:${params.repo}`;

  return fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'GraphQL-Features': 'discussions_api',
    },

    body: JSON.stringify({
      query: GET_DISCUSSION_CATEGORIES_QUERY,
      variables: { query },
    }),
  }).then((r) => r.json());
}
