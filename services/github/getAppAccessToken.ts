import { getJWT } from '../../lib/jwt';
import { parseRepoWithOwner } from '../../lib/utils';

const GITHUB_API_HOST = 'https://api.github.com';
const GITHUB_REPO_INSTALLATION_URL = (repoWithOwner: string) =>
  `${GITHUB_API_HOST}/repos/${repoWithOwner}/installation`;
const GITHUB_INSTALLATIONS_URL = `${GITHUB_API_HOST}/app/installations`;
const GITHUB_ACCESS_TOKEN_URL = (id: string) => `${GITHUB_INSTALLATIONS_URL}/${id}/access_tokens`;

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
