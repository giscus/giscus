import { Theme } from './variables';

export function resolveTheme(theme: Theme): Theme {
  if (!theme) return 'light';
  if (theme in Theme) return theme as Theme;
  return 'custom';
}

export function getThemeUrl(resolvedTheme: Theme, theme: Theme): Theme {
  return resolvedTheme === 'custom' ? theme : `/themes/${resolvedTheme}.css`;
}

export function getOriginHost(origin: string) {
  try {
    return new URL(origin).origin;
  } catch (err) {
    return '';
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

export function resizeTextArea(textarea: HTMLTextAreaElement) {
  textarea.style.height = `0px`;
  const height = textarea.scrollHeight <= 772 ? textarea.scrollHeight : 772;
  textarea.style.height = `${height}px`;
}
