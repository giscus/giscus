import { IGiscussion } from '../../lib/models/adapter';
import { IGiscussionsRequest } from '../../lib/models/giscussions';

export async function getGiscussions(params: IGiscussionsRequest, token?: string) {
  const urlParams = new URLSearchParams({ ...params });
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const data = await fetch(`/api/discussions?${urlParams}`, { headers }).then((response) =>
    response.json(),
  );
  return data as IGiscussion;
}
