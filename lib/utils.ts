import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInYears from 'date-fns/differenceInYears';
import format from 'date-fns/format';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import { Theme } from './variables';

export function getTheme(theme: string): Theme {
  if (theme === 'preferred_color_scheme') {
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  if (!theme) return 'light';
  if (theme in Theme) return theme as Theme;
  return 'custom';
}

export function getOriginHost(origin: string) {
  try {
    return new URL(origin).origin;
  } catch (err) {
    return '';
  }
}

export function formatDate(dt: string) {
  return format(new Date(dt), 'LLL d, y, p O');
}

export function formatDateDistance(dt: string) {
  const inputDate = new Date(dt);
  const now = new Date();

  if (differenceInMonths(now, inputDate) >= 1) {
    if (differenceInYears(now, inputDate) >= 1) {
      return format(inputDate, 'LLL d, y');
    }

    return format(inputDate, 'LLL d');
  }

  return formatDistanceStrict(inputDate, now, { addSuffix: true });
}

export function isEmpty(v: unknown) {
  return v === null || v === undefined || v === '' || Number.isNaN(v);
}

export function clipboardCopy(text: string) {
  const placeholder = document.createElement('textarea');
  document.body.appendChild(placeholder);

  placeholder.value = text;
  placeholder.select();
  document.execCommand('copy');

  document.body.removeChild(placeholder);
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
