const GITHUB_API_URL = 'https://api.github.com/markdown';

export async function renderMarkdown(text: string) {
  return fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      // Authorization: `token ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ text }),
  }).then((r) => r.text());
}
