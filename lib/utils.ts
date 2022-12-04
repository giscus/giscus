import { AvailableTheme, availableThemes, Theme } from './variables';

export let webcrypto: Crypto;

if (typeof window === 'undefined') {
  import('crypto').then((module) => {
    webcrypto = module.webcrypto;
  });
} else {
  webcrypto = window.crypto;
}

function isAvailableTheme(theme: Theme): theme is AvailableTheme {
  return availableThemes.includes(theme as AvailableTheme);
}

export function resolveTheme(theme: Theme): Theme {
  if (!theme) return 'preferred_color_scheme';
  if (isAvailableTheme(theme)) return theme;
  return 'custom';
}

export function getThemeUrl(resolvedTheme: Theme, theme: Theme): Theme {
  return resolvedTheme === 'custom' ? theme : `/themes/${resolvedTheme}.css`;
}

export function getOriginHost(origin: string) {
  try {
    const url = new URL(origin);
    url.searchParams.delete('giscus');
    return { origin: url.toString(), originHost: url.origin };
  } catch (err) {
    return { origin: '', originHost: '' };
  }
}

export function cleanAnchor(origin: string) {
  // Make sure the anchor is not followed by / as it means the website probably
  // is an SPA that uses anchor-based routing.
  let length = origin.length;
  const split = origin.split(/#(?!\/)/);
  if (split.length > 1) {
    length -= split.pop().length + 1;
  }
  return origin.substring(0, length);
}

export function cleanSessionParam(url: string) {
  try {
    const newUrl = new URL(url);
    newUrl.searchParams.delete('giscus');
    return newUrl.toString();
  } catch (err) {
    return url;
  }
}

export function isEmpty(v: unknown) {
  return v === null || v === undefined || v === '' || Number.isNaN(v);
}

export async function clipboardCopy(text: string) {
  await navigator.clipboard.writeText(text);
}

export function parseRepoWithOwner(repoWithOwner: string) {
  const [owner, name] = repoWithOwner.split('/');
  return { owner, name };
}

export function normalizeRepoName(repoOrLink: string) {
  if (!repoOrLink) return '';

  // Extract repo name from link if it looks like a GitHub link
  const pattern = /github\.com\/(\S*?\/\S*)/;
  repoOrLink = repoOrLink.match(pattern)?.[1] || repoOrLink;

  // Remove any trailing information as we only need the owner and name
  const { owner, name } = parseRepoWithOwner(repoOrLink);

  if (!name) return `${owner}/${owner}`; // 'giscus' -> 'giscus/giscus'
  return `${owner}/${name}`;
}

export function resizeTextArea(textarea: HTMLTextAreaElement) {
  const maxHeight = 270;
  textarea.style.height = `0px`;
  const height = textarea.scrollHeight <= maxHeight ? textarea.scrollHeight : maxHeight;
  textarea.style.height = `${height}px`;
}

export async function digestMessage(message: string, algorithm: AlgorithmIdentifier = 'SHA-1') {
  // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await webcrypto.subtle.digest(algorithm, msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function hasStorageAccess() {
  // If strict tracking protection is enabled in the browser,
  // accessing localStorage may be forbidden.
  if (typeof document.hasStorageAccess === 'undefined') return true;
  if (await document.hasStorageAccess()) return true;
  try {
    await document.requestStorageAccess();
  } catch (err) {
    // The request can only be made under very specific conditions.
  }
  return await document.hasStorageAccess();
}
