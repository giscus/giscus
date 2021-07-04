import { GError } from '../../lib/types/github';
import { GITHUB_REPOS_API_URL } from '../config';

interface ContentsResponse {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

export async function getFile(repoWithOwner: string, path: string, token?: string) {
  const response = await fetch(`${GITHUB_REPOS_API_URL}/${repoWithOwner}/contents/${path}`, {
    headers: token ? { Authorization: `token ${token}` } : {},
  });

  if (response.status === 404) {
    throw new Error(`Could not find ${path} in ${repoWithOwner} repository.`);
  }

  const data: ContentsResponse | GError = await response.json();

  if ('message' in data) {
    throw new Error(
      `Could not fetch ${path} from ${repoWithOwner} repository. Message: "${data.message}"`,
    );
  }

  return Buffer.from(data.content, 'base64').toString();
}

export async function getJSONFile<T>(
  repoWithOwner: string,
  path: string,
  token?: string,
): Promise<T> {
  return JSON.parse(await getFile(repoWithOwner, path, token));
}
