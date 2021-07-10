import { IRepoConfig } from '../../lib/types/giscus';
import { getJSONFile } from './getFile';

export async function getRepoConfig(repoWithOwner: string, token?: string) {
  try {
    return await getJSONFile<IRepoConfig>(repoWithOwner, 'giscus.json', token);
  } catch (err) {
    return {};
  }
}
