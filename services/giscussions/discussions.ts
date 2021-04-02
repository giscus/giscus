import { useMemo } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';
import { IGiscussion } from '../../lib/models/adapter';
import { IGiscussionsRequest } from '../../lib/models/giscussions';

export function useDiscussions(params: IGiscussionsRequest, token?: string) {
  const urlParams = new URLSearchParams({ ...params });
  const headers = useMemo(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return { headers };
  }, [token]);

  const { data, error } = useSWR<IGiscussion>([`/api/discussions?${urlParams}`, headers], fetcher);
  return {
    data: data,
    isLoading: !error && !data,
    isError: !!error,
  };
}
