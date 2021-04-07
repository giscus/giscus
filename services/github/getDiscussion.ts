import { GUser, GRepositoryDiscussion } from '../../lib/models/github';
import { getReadAccessToken } from './getReadAccessToken';

const GITHUB_API_URL = 'https://api.github.com/graphql';

const GET_DISCUSSION_QUERY = `
  query($id: ID!) {
    viewer {
      avatarUrl
      login
      url
    }
    discussion: node(id: $id) {
      ... on Discussion {
        id
        comments(first: 20) {
          totalCount
          nodes {
            id
            upvoteCount
            viewerHasUpvoted
            author {
              avatarUrl
              login
              url
            }
            createdAt
            url
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
                id
                author {
                  avatarUrl
                  login
                  url
                }
                createdAt
                url
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
                replyTo {
                  id
                }
              }
            }
          }
        }
      }
    }
  }`;

export interface GetDiscussionParams {
  id: string;
}

export interface GetDiscussionResponse {
  data: {
    viewer: GUser;
    discussion: GRepositoryDiscussion;
  };
}

export async function getDiscussion(
  params: GetDiscussionParams,
  token?: string,
): Promise<GetDiscussionResponse> {
  return fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token || (await getReadAccessToken())}`,
      'GraphQL-Features': 'discussions_api',
    },

    body: JSON.stringify({
      query: GET_DISCUSSION_QUERY,
      variables: params,
    }),
  }).then((r) => r.json());
}
