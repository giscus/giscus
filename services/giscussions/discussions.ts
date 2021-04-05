import { useMemo } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';
import { IGiscussion } from '../../lib/models/adapter';

export function useDiscussions(id: string, token?: string) {
  const urlParams = new URLSearchParams({ id });
  const headers = useMemo(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return { headers };
  }, [token]);

  const { data, error, mutate } = useSWR<IGiscussion>(
    [`/api/discussions?${urlParams}`, headers],
    fetcher,
  );
  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
}
