import { DiscussionQuery } from '../../lib/types/common';
import { GError, GMultipleErrors, GRepositoryDiscussionCount } from '../../lib/types/github';
import { parseRepoWithOwner } from '../../lib/utils';
import { GITHUB_GRAPHQL_API_URL } from '../config';

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

const GET_DISCUSSION_QUERY = (type: 'term' | 'number') => `
  query(${
    type === 'term' ? '$query: String!' : '$owner: String! $name: String! $number: Int!'
  }) {
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

export async function getDiscussionCommentsCount(
  params: DiscussionQuery,
  token: string,
): Promise<GetDiscussionCommentsCountResponse | GError | GMultipleErrors> {
  const { repo: repoWithOwner, term, number, category } = params;

  // Force repo to lowercase to prevent GitHub's bug when using category in query.
  // https://github.com/giscus/giscus/issues/118
  const repo = repoWithOwner.toLowerCase();
  const categoryQuery = category ? `category:${JSON.stringify(category)}` : '';
  const query = `repo:${repo} ${categoryQuery} in:title ${term}`;
  const gql = GET_DISCUSSION_QUERY(number ? 'number' : 'term');

  return fetch(GITHUB_GRAPHQL_API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },

    body: JSON.stringify({
      query: gql,
      variables: {
        repo,
        query,
        number,
        ...parseRepoWithOwner(repo),
      },
    }),
  }).then((r) => r.json());
}
