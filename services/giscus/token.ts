import { IError } from '../../lib/types/adapter';
import { ITokenRequest, ITokenResponse } from '../../lib/types/giscus';

export async function getToken(session: string) {
  const result: ITokenResponse | IError = await fetch('/api/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ session } as ITokenRequest),
  }).then((r) => r.json());

  if ('error' in result) throw new Error(result.error);

  const { token } = result;
  if (!token) throw new Error('Unable to retrieve token.');

  return token;
}
