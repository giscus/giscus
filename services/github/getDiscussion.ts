import { DiscussionQuery, PaginationParams } from '../../lib/types/common';
import { GUser, GRepositoryDiscussion } from '../../lib/types/github';
import { githubDiscussionGraphqlRequest } from './graphql';

const DISCUSSION_QUERY = `
  id
  url
  locked
  repository {
    nameWithOwner
  }
  reactions {
    totalCount
  }
  reactionGroups {
    content
    users {
      totalCount
    }
    viewerHasReacted
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
      replies(last: 100) {
        totalCount
        nodes {
          id
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

export async function getDiscussion(params: GetDiscussionParams, token: string) {
  const { repo: repoWithOwner, term, number, category, ...pagination } = params;

  const gql = GET_DISCUSSION_QUERY(number ? 'number' : 'term');

  return githubDiscussionGraphqlRequest<GetDiscussionResponse, PaginationParams>({
    gql,
    repoWithOwner,
    category,
    term,
    token,
    number,
    variables: pagination,
  });
}
