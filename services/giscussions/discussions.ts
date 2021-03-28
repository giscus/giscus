import { IGiscussion } from '../../lib/models/adapter';
import { IGiscussionsRequest } from '../../lib/models/giscussions';

export async function getGiscussions(params: IGiscussionsRequest, token: string) {
  const urlParams = new URLSearchParams({ ...params });
  const data: IGiscussion = await fetch(`/api/discussions?${urlParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
  return data;
}
