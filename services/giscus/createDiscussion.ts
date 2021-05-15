import { GCreateDiscussionInput } from '../../lib/types/github';

export async function createDiscussion(
  repo: string,
  input: GCreateDiscussionInput,
): Promise<string> {
  const { id } = await fetch(`/api/discussions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ repo, input }),
  }).then((r) => r.json());
  return id;
}
