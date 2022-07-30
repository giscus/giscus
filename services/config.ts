// GitHub

const GITHUB_API_HOST = 'https://api.github.com';

export const GITHUB_GRAPHQL_API_URL = `${GITHUB_API_HOST}/graphql`;

export const GITHUB_MARKDOWN_API_URL = `${GITHUB_API_HOST}/markdown`;

export const GITHUB_REPOS_API_URL = `${GITHUB_API_HOST}/repos`;

export const GITHUB_INSTALLATIONS_URL = `${GITHUB_API_HOST}/app/installations`;

export const GITHUB_REPO_INSTALLATION_URL = (repoWithOwner: string) =>
  `${GITHUB_API_HOST}/repos/${repoWithOwner}/installation`;

export const GITHUB_ACCESS_TOKEN_URL = (id: number) =>
  `${GITHUB_INSTALLATIONS_URL}/${id}/access_tokens`;

// Supabase

export const SUPABASE_KEY = process.env.SUPABASE_KEY;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_INSTALLATION_ACCESS_TOKENS_TABLE =
  process.env.SUPABASE_INSTALLATION_ACCESS_TOKENS_TABLE || 'installation_access_tokens';

export const SUPABASE_INSTALLATION_ACCESS_TOKENS_URL = `${SUPABASE_URL}/rest/v1/${SUPABASE_INSTALLATION_ACCESS_TOKENS_TABLE}`;
