import { format, formatDistanceStrict } from 'date-fns';

export function formatDate(dt: string) {
  return format(new Date(dt), 'LLL d, y, p O');
}

export function formatDateDistance(dt: string) {
  return formatDistanceStrict(new Date(dt), new Date(), { addSuffix: true });
}

export function isEmpty(v: unknown) {
  return v === null || v === undefined || v === '';
}
