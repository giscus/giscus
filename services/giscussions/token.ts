import { ITokenRequest, ITokenResponse } from '../../lib/models/giscussions';

export async function getToken(session: string) {
  const { token }: ITokenResponse = await fetch('/api/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ session } as ITokenRequest),
  }).then((r) => r.json());

  return token;
}
