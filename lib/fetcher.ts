import { isNullish } from './utils';

export const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};

export const cleanParams = (params: Record<string, unknown>) =>
  Object.entries(params).reduce(
    (prev, [key, value]) => (!isNullish(value) ? { ...prev, [key]: value } : prev),
    {},
  );

export const reduceParams = (params: Record<string, unknown>) =>
  Object.entries(params)
    .reduce(
      (prev, [key, value]) =>
        !isNullish(value) ? `${prev} ${key}: ${JSON.stringify(value)}` : prev,
      '',
    )
    .trim();
