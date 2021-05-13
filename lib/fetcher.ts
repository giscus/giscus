import { isEmpty } from './utils';

export async function fetcher(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'An error occurred while fetching the data');
  }
  return data;
}

export function cleanParams(params: Record<string, unknown>) {
  return Object.entries(params).reduce(
    (prev, [key, value]) => (!isEmpty(value) ? { ...prev, [key]: value } : prev),
    {},
  );
}
