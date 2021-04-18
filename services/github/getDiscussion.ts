import { reduceParams } from '../../lib/fetcher';
import { PaginationParams } from '../../lib/models/common';
import { GUser, GRepositoryDiscussion } from '../../lib/models/github';
import { getReadAccessToken } from './getReadAccessToken';

const GITHUB_API_URL = 'https://api.github.com/graphql';

const GET_DISCUSSION_QUERY = (pagination: PaginationParams) => `
  query($id: ID!) {
    viewer {
      avatarUrl
      login
      url
    }
    discussion: node(id: $id) {
      ... on Discussion {
        id
        repository {
          nameWithOwner
        }
        comments(${reduceParams({ ...pagination })}) {
          totalCount
          pageInfo {
            startCursor
            hasNextPage
            hasPreviousPage
            endCursor
          }
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
            lastEditedAt
            deletedAt
            isMinimized
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
                lastEditedAt
                deletedAt
                isMinimized
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

export interface GetDiscussionParams extends PaginationParams {
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
  const { id, ...pagination } = params;
  return fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token || (await getReadAccessToken())}`,
      'GraphQL-Features': 'discussions_api',
    },

    body: JSON.stringify({
      query: GET_DISCUSSION_QUERY(pagination),
      variables: { id },
    }),
  }).then((r) => r.json());
}
