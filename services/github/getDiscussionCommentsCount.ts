import { DiscussionQuery } from '../../lib/types/common';
import { GRepositoryDiscussionCount } from '../../lib/types/github';
import { githubDiscussionGraphqlRequest } from './graphql';

const DISCUSSION_QUERY = `
  comments {
    totalCount
  }`;

const SEARCH_QUERY = `
  search(type: DISCUSSION last: 1 query: $query) {
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

const GET_DISCUSSION_COMMENTS_COUNT_QUERY = (type: 'term' | 'number') => `
  query(${type === 'term' ? '$query: String!' : '$owner: String! $name: String! $number: Int!'}) {
    ${type === 'term' ? SEARCH_QUERY : SPECIFIC_QUERY}
  }`;

interface SearchResponse {
  data: {
    search: {
      nodes: Array<GRepositoryDiscussionCount>;
    };
  };
}

interface SpecificResponse {
  data: {
    repository: {
      discussion: GRepositoryDiscussionCount;
    };
  };
}

export type GetDiscussionCommentsCountResponse = SearchResponse | SpecificResponse;

export async function getDiscussionCommentsCount(params: DiscussionQuery, token: string) {
  const { repo: repoWithOwner, term, number, category } = params;

  const gql = GET_DISCUSSION_COMMENTS_COUNT_QUERY(number ? 'number' : 'term');

  return githubDiscussionGraphqlRequest<GetDiscussionCommentsCountResponse>({
    gql,
    repoWithOwner,
    category,
    term,
    token,
    number,
    variables: {},
  });
}
