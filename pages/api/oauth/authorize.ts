import type { NextApiRequest, NextApiResponse } from 'next';
import { encodeState } from '../../../lib/oauth/state';
import { env } from '../../../lib/variables';

const GITHUB_OAUTH_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';

export default async function OAuthAuthorizeApi(req: NextApiRequest, res: NextApiResponse) {
  const appReturnUrl = req.query.redirect_uri as string;

  if (!appReturnUrl) {
    res.status(400).json({ error: '`redirect_uri` is required.' });
    return;
  }

  const { client_id } = env;
  const proto = req.headers['x-forwarded-proto'] || 'http';
  const redirect_uri = `${proto}://${req.headers.host}/api/oauth/authorized`;
  const state = await encodeState(appReturnUrl, env.encryption_password);

  const oauthParams = new URLSearchParams({ client_id, redirect_uri, state });
  res.redirect(302, `${GITHUB_OAUTH_AUTHORIZE_URL}?${oauthParams}`);
}
