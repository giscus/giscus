import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../lib/variables';
import { decodeState } from '../../../lib/oauth/state';
import { ITokenRequest } from '../../../lib/types/giscus';
import { addCorsHeaders } from '../../../lib/cors';

export default async function OAuthTokenApi(req: NextApiRequest, res: NextApiResponse) {
  addCorsHeaders(req, res);

  const { session } = req.body as ITokenRequest;
  if (!session) {
    res.status(400).json({ error: 'Unable to parse request body.' });
    return;
  }

  const { encryption_password } = env;
  let token: string;
  try {
    token = await decodeState(session, encryption_password);
  } catch (err) {
    res.status(400).json({ error: err.message });
    return;
  }

  res.status(200).json({ token });
}
