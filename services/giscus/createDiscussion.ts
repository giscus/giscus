import { GCreateDiscussionInput } from '../../lib/types/github';

export async function createDiscussion(
  token: string,
  repo: string,
  input: GCreateDiscussionInput,
): Promise<string> {
  const { id } = await fetch(`/api/discussions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ repo, input }),
  }).then((r) => r.json());
  return id;
}
