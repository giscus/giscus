import { differenceInMonths, differenceInYears, format, formatDistanceStrict } from 'date-fns';

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
  return v === null || v === undefined || v === '';
}
