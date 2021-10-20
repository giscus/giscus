import { GError, GMultipleErrors } from '../../lib/types/github';
import { parseRepoWithOwner } from '../../lib/utils';
import { GITHUB_GRAPHQL_API_URL } from '../config';

export async function githubDiscussionGraphqlRequest<
  Response,
  AdditionalVariables = Record<string, never>,
>({
  gql,
  repoWithOwner,
  category,
  term,
  token,
  number,
  variables,
}: {
  gql: string;
  repoWithOwner: string;
  category: string;
  term: string;
  token: string;
  number: number;
  variables: AdditionalVariables;
}): Promise<Response | GError | GMultipleErrors> {
  // Force repo to lowercase to prevent GitHub's bug when using category in query.
  // https://github.com/giscus/giscus/issues/118
  const repo = repoWithOwner.toLowerCase();
  const categoryQuery = category ? `category:${JSON.stringify(category)}` : '';
  const query = `repo:${repo} ${categoryQuery} in:title ${term}`;

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
        ...variables,
      },
    }),
  }).then((r) => r.json());
}
