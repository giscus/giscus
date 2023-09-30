import { InstallationAccessToken } from '../../lib/types/cache';
import { env } from '../../lib/variables';
import {
  getCachedAccessToken as postgrestGet,
  setCachedAccessToken as postgrestSet,
} from './postgrest';
import {
  getCachedAccessToken as supabaseGet,
  setCachedAccessToken as supabaseSet,
} from './supabase';

interface TokenCacheClient {
  get(installationId: number): Promise<string>;
  set(token: InstallationAccessToken): Promise<boolean>;
}

function getTokenCacheClient(): TokenCacheClient {
  if (env.postgrest_url && env.postgrest_role && env.postgrest_secret) {
    return {
      get: postgrestGet,
      set: postgrestSet,
    };
  }
  return {
    get: supabaseGet,
    set: supabaseSet,
  };
}

export const TokenCache = getTokenCacheClient();
