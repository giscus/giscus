import { isEmpty } from './utils';

export async function fetcher(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  if (!res.ok) throw await res.json();
  return res.json();
}

export function cleanParams(params: Record<string, unknown>) {
  return Object.entries(params).reduce(
    (prev, [key, value]) => (!isEmpty(value) ? { ...prev, [key]: value } : prev),
    {},
  );
}
