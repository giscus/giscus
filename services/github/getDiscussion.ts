import { DiscussionQuery, PaginationParams } from '../../lib/types/common';
import { GUser, GRepositoryDiscussion, GError } from '../../lib/types/github';
import { getAppAccessToken } from './getAppAccessToken';

const GITHUB_API_URL = 'https://api.github.com/graphql';

const GET_DISCUSSION_QUERY = `
  query($query: String! $first: Int $last: Int $after: String $before: String) {
    viewer {
      avatarUrl
      login
      url
    }
    search(type: DISCUSSION last: 1 query: $query) {
      discussionCount
      nodes {
        ... on Discussion {
          id
          repository {
            nameWithOwner
          }
          comments(first: $first last: $last after: $after before: $before) {
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
              viewerCanUpvote
              author {
                avatarUrl
                login
                url
              }
              viewerDidAuthor
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
    }
  }`;

export interface GetDiscussionParams extends PaginationParams, DiscussionQuery {}

export interface GetDiscussionResponse {
  data: {
    viewer: GUser;
    search: {
      discussionCount: number;
      nodes: Array<GRepositoryDiscussion>;
    };
  };
}

export async function getDiscussion(
  params: GetDiscussionParams,
  token?: string,
): Promise<GetDiscussionResponse | GError> {
  const { repo, term, ...pagination } = params;
  const query = `repo:${repo} in:title ${term}`;
  if (!token) token = await getAppAccessToken(repo);
  if (!token)
    return {
      message: 'giscussions is not installed on this repository',
      documentation_url:
        'https://docs.github.com/en/rest/reference/apps#get-a-repository-installation-for-the-authenticated-app',
    };

  return fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'GraphQL-Features': 'discussions_api',
    },

    body: JSON.stringify({
      query: GET_DISCUSSION_QUERY,
      variables: { repo, query, ...pagination },
    }),
  }).then((r) => r.json());
}
