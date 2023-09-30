import { InstallationAccessToken } from '../../lib/types/cache';
import { env } from '../../lib/variables';

const SUPABASE_INSTALLATION_ACCESS_TOKENS_TABLE =
  env.supabase_table || 'installation_access_tokens';

export const SUPABASE_INSTALLATION_ACCESS_TOKENS_URL = `${env.supabase_url}/rest/v1/${SUPABASE_INSTALLATION_ACCESS_TOKENS_TABLE}`;

export async function getCachedAccessToken(installationId: number) {
  if (!env.supabase_key) return '';

  const params = new URLSearchParams({
    select: '*',
    installation_id: `eq.${installationId}`,
  });
  const url = `${SUPABASE_INSTALLATION_ACCESS_TOKENS_URL}?${params}`;

  const response = await fetch(url, {
    headers: {
      apikey: env.supabase_key,
      Authorization: `Bearer ${env.supabase_key}`,
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
  if (!env.supabase_key) return false;

  const params = new URLSearchParams({
    installation_id: `eq.${installation_id}`,
  });
  const url = `${SUPABASE_INSTALLATION_ACCESS_TOKENS_URL}?${params}`;

  const body: InstallationAccessToken = {
    installation_id,
    token,
    expires_at,
    updated_at: new Date().toISOString(),
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      apikey: env.supabase_key,
      Authorization: `Bearer ${env.supabase_key}`,
      Accept: 'application/vnd.pgrst.object+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response.ok;
}
