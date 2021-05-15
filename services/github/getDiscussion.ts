import { DiscussionQuery, PaginationParams } from '../../lib/types/common';
import { GUser, GRepositoryDiscussion, GError } from '../../lib/types/github';
import { parseRepoWithOwner } from '../../lib/utils';

const GITHUB_API_URL = 'https://api.github.com/graphql';

const DISCUSSION_QUERY = `
  id
  locked
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
  }`;

const SEARCH_QUERY = `
  search(type: DISCUSSION last: 1 query: $query) {
    discussionCount
    nodes {
      ... on Discussion {
        ${DISCUSSION_QUERY}
      }
    }
  }`;

const SPECIFIC_QUERY = `
  repository(owner: $owner, name: $name) {
    discussion(number: $number) {
      ${DISCUSSION_QUERY}
    }
  }
`;

const GET_DISCUSSION_QUERY = (type: 'term' | 'number') => `
  query(${
    type === 'term' ? '$query: String!' : '$owner: String! $name: String! $number: Int!'
  } $first: Int $last: Int $after: String $before: String) {
    viewer {
      avatarUrl
      login
      url
    }
    ${type === 'term' ? SEARCH_QUERY : SPECIFIC_QUERY}
  }`;

export interface GetDiscussionParams extends PaginationParams, DiscussionQuery {}

interface SearchResponse {
  data: {
    viewer: GUser;
    search: {
      discussionCount: number;
      nodes: Array<GRepositoryDiscussion>;
    };
  };
}

interface SpecificResponse {
  data: {
    viewer: GUser;
    repository: {
      discussion: GRepositoryDiscussion;
    };
  };
}

export type GetDiscussionResponse = SearchResponse | SpecificResponse;

export async function getDiscussion(
  params: GetDiscussionParams,
  token: string,
): Promise<GetDiscussionResponse | GError> {
  const { repo, term, number, ...pagination } = params;
  const query = `repo:${repo} fork:true in:title ${term}`;
  const gql = GET_DISCUSSION_QUERY(number ? 'number' : 'term');
  return fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'GraphQL-Features': 'discussions_api',
    },

    body: JSON.stringify({
      query: gql,
      variables: {
        repo,
        query,
        number,
        ...parseRepoWithOwner(repo),
        ...pagination,
      },
    }),
  }).then((r) => r.json());
}
