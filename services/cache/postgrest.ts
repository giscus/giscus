import { InstallationAccessToken } from '../../lib/types/cache';
import { env } from '../../lib/variables';
import { sign } from 'jsonwebtoken';

function getJWT() {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    role: env.postgrest_role,
    // JWT expiration time (10 minute maximum)
    exp: now + 10 * 60,
  };
  return sign(payload, env.postgrest_secret);
}

export async function getCachedAccessToken(installationId: number) {
  if (!env.postgrest_url || !env.postgrest_secret) return '';

  const params = new URLSearchParams({
    select: '*',
    installation_id: `eq.${installationId}`,
  });
  const url = `${env.postgrest_url}?${params}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getJWT()}`,
      Accept: 'application/vnd.pgrst.object+json',
      Range: '0',
    },
  });

  if (!response.ok) return '';

  const { token, expires_at }: InstallationAccessToken = await response.json();

  const expiresAt = new Date(expires_at).getTime();
  const now = new Date().getTime();
  const intolerance = 1000 * 60 * 5; // 5 minutes

  if (expiresAt - now < intolerance) return '';

  return token;
}

export async function setCachedAccessToken({
  installation_id,
  token,
  expires_at,
}: InstallationAccessToken) {
  if (!env.postgrest_url || !env.postgrest_secret) return false;

  const params = new URLSearchParams({
    installation_id: `eq.${installation_id}`,
  });
  const url = `${env.postgrest_url}?${params}`;

  const body: InstallationAccessToken = {
    installation_id,
    token,
    expires_at,
    updated_at: new Date().toISOString(),
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getJWT()}`,
      Accept: 'application/vnd.pgrst.object+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response.ok;
}
