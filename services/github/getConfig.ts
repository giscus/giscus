import { RepoConfig } from '../../lib/types/giscus';
import { getJSONFile } from './getFile';

export async function getRepoConfig(repoWithOwner: string, token?: string) {
  try {
    return await getJSONFile<RepoConfig>(repoWithOwner, 'giscus.json', token);
  } catch (err) {
    return {};
  }
}
