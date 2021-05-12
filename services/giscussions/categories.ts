import { ICategories } from '../../lib/types/adapter';

export async function getCategories(repo: string): Promise<ICategories> {
  const result = await fetch(`/api/categories?${new URLSearchParams({ repo })}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json());
  if ('error' in result) throw new Error('Unable to fetch discussion categories');
  return result;
}
