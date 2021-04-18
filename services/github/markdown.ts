const GITHUB_API_URL = 'https://api.github.com/markdown';

export async function renderMarkdown(text: string, token?: string, context?: string) {
  return fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: token ? { Authorization: `token ${token}` } : {},
    body: JSON.stringify({ mode: 'gfm', text, ...(context ? { context } : {}) }),
  }).then((r) => r.text());
}
