import { isEmpty } from './utils';

export class CustomError extends Error {
  status: number;
  data: Record<string, unknown>;

  constructor(m: string, status: number, data?: Record<string, unknown>) {
    super(m);
    this.status = status;
    this.data = data;
  }
}

export async function fetcher([input, init]: Parameters<typeof fetch>) {
  const res = await fetch(input, init);
  const data = await res.json();
  if (!res.ok) {
    throw new CustomError(data?.error || res.statusText, res.status, data);
  }
  return data;
}

export function cleanParams(params: Record<string, unknown>) {
  return Object.entries(params).reduce(
    (prev, [key, value]) => (!isEmpty(value) ? { ...prev, [key]: value } : prev),
    {},
  );
}
