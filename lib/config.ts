import { RepoConfig } from './types/giscus';

export function assertOrigin(origin: string, { origins = [], originsRegex = [] }: RepoConfig) {
  if (!origins.length && !originsRegex.length) return true;

  for (let i = 0; i < origins.length; i++) {
    if (origin === origins[i]) return true;
  }

  for (let i = 0; i < originsRegex.length; i++) {
    if (new RegExp(originsRegex[i]).test(origin)) return true;
  }

  return false;
}
