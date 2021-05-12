import { getJWT } from '../../lib/jwt';

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

async function getInstallationId(repoWithOwner: string) {
  const { id } = await fetch(GITHUB_REPO_INSTALLATION_URL(repoWithOwner), {
    headers: getHeaders(),
  }).then((response) => response.json());
  return id;
}

export async function getAppAccessToken(repoWithOwner: string) {
  const installationId = await getInstallationId(repoWithOwner);

  const response: GResponse = await fetch(GITHUB_ACCESS_TOKEN_URL(installationId), {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ repositories: [repoWithOwner.split('/')[1]] }),
  }).then((value) => value.json());

  return response.token;
}
