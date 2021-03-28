/*
 * Workaround to let viewers see comments without signing in.
 *
 * GitHub's GraphQL API requires authentication with an access token.
 * As a GitHub App, we can only create access tokens by authenticating
 * as a user (through OAuth), or as an installation.
 *
 * OAuth is not an option because we want users to be able to see
 * comments without signing in. Therefore, we should create an access
 * token by authenticating as an installation.
 *
 * However, we need an installation ID to create an access token. We
 * don't actually need to request access to a repository on the
 * installation. Therefore, we can use any installation ID of our app.
 * In this case, I'm using the installation on my main account.
 */

import { getJWT } from '../../lib/jwt';
import { env } from '../../lib/variables';

const GITHUB_INSTALLATIONS_URL = 'https://api.github.com/app/installations';
const GITHUB_ACCESS_TOKEN_URL = `${GITHUB_INSTALLATIONS_URL}/${env.installation_id}/access_tokens`;

interface GResponse {
  token: string;
  expires_at: string;
  permissions: {
    discussions: string;
    metadata: string;
  };
  repository_selection: string;
}

export async function getReadAccessToken() {
  const response: GResponse = await fetch(GITHUB_ACCESS_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getJWT()}`,
      Accept: 'application/vnd.github.v3+json',
    },
    // We don't need access to any repository.
    body: JSON.stringify({ repositories: [] }),
  }).then((value) => value.json());

  return response.token;
}
