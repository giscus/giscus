import { getJWT } from '../../lib/jwt';
import { parseRepoWithOwner } from '../../lib/utils';

import { GITHUB_REPO_INSTALLATION_URL, GITHUB_ACCESS_TOKEN_URL } from '../config';

interface GResponse {
  token: string;
  expires_at: string;
  permissions: {
    discussions: string;
    metadata: string;
  };
  repository_selection: string;
  repositories?: Array<unknown>;
}

function getHeaders() {
  return {
    Authorization: `Bearer ${getJWT()}`,
    Accept: 'application/vnd.github.v3+json',
  };
}

async function getInstallationId(repoWithOwner: string): Promise<string> {
  const { id } = await fetch(GITHUB_REPO_INSTALLATION_URL(repoWithOwner), {
    headers: getHeaders(),
  }).then((response) => response.json());
  return id;
}

export async function getAppAccessToken(repoWithOwner: string): Promise<string> {
  const installationId = await getInstallationId(repoWithOwner);
  if (!installationId)
    throw {
      message: 'giscus is not installed on this repository',
      documentation_url:
        'https://docs.github.com/en/rest/reference/apps#get-a-repository-installation-for-the-authenticated-app',
    };

  const response: GResponse = await fetch(GITHUB_ACCESS_TOKEN_URL(installationId), {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ repositories: [parseRepoWithOwner(repoWithOwner).name] }),
  }).then((value) => value.json());

  return response.token;
}
