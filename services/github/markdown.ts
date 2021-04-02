const GITHUB_API_URL = 'https://api.github.com/markdown';

export async function renderMarkdown(text: string, token?: string) {
  return fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: token ? { Authorization: `token ${token}` } : {},
    body: JSON.stringify({ text }),
  }).then((r) => r.text());
}
