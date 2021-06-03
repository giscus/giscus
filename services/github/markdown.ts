import { GITHUB_MARKDOWN_API_URL } from '../config';

export async function renderMarkdown(text: string, token?: string, context?: string) {
  return fetch(GITHUB_MARKDOWN_API_URL, {
    method: 'POST',
    headers: token ? { Authorization: `token ${token}` } : {},
    body: JSON.stringify({ mode: 'gfm', text, ...(context ? { context } : {}) }),
  }).then((r) => r.text());
}
