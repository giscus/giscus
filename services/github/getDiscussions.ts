import { GUser, GRepository } from '../../lib/models/github';

const GITHUB_API_URL = 'https://api.github.com/graphql';

const GET_DISCUSSIONS_QUERY = `
  query($repositoryOwner: String!, $repositoryName: String!, $discussionNumber: Int!) {
    viewer {
      avatarUrl
      login
      url
    }
    repository(owner: $repositoryOwner, name: $repositoryName) {
      discussion(number: $discussionNumber) {
        comments(first: 20) {
          totalCount
          nodes {
            author {
              avatarUrl
              login
              url
            }
            createdAt
            authorAssociation
            includesCreatedEdit
            bodyHTML
            reactionGroups {
              content
              users {
                totalCount
              }
              viewerHasReacted
            }
            replies(first: 100) {
              totalCount
              nodes {
                author {
                  avatarUrl
                  login
                  url
                }
                createdAt
                authorAssociation
                includesCreatedEdit
                bodyHTML
                reactionGroups {
                  content
                  users {
                    totalCount
                  }
                  viewerHasReacted
                }
              }
            }
          }
        }
      }
    }
  }`;

export interface GetDiscussionsParams {
  repositoryOwner: string;
  repositoryName: string;
  discussionNumber: number;
}

export interface GetDiscussionsBody {
  data: {
    viewer: GUser;
    repository: GRepository;
  };
}

export async function getDiscussions(params: GetDiscussionsParams): Promise<GetDiscussionsBody> {
  return fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'GraphQL-Features': 'discussions_api',
    },

    body: JSON.stringify({
      query: GET_DISCUSSIONS_QUERY,
      variables: params,
    }),
  }).then((r) => r.json());
}
