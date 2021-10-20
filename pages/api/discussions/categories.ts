import type { NextApiRequest, NextApiResponse } from 'next';
import { addCorsHeaders } from '../../../lib/cors';
import { ICategories, IError } from '../../../lib/types/adapter';
import { handleGithubDiscussionResponse } from '../../../services/github/errors';
import { getAppAccessToken } from '../../../services/github/getAppAccessToken';
import {
  getDiscussionCategories,
  GetDiscussionCategoriesResponse,
} from '../../../services/github/getDiscussionCategories';

export default async function DiscussionCategoriesApi(
  req: NextApiRequest,
  res: NextApiResponse<ICategories | IError>,
) {
  addCorsHeaders(req, res);

  const params = { repo: req.query.repo as string };
  const result = { repositoryId: '', categories: [] };

  let token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    try {
      token = await getAppAccessToken(params.repo);
    } catch (error) {
      res.status(403).json({ error: error.message });
      return;
    }
  }

  const response = await getDiscussionCategories(params, token);
  const handledResponse = handleGithubDiscussionResponse<GetDiscussionCategoriesResponse['data']>(
    response,
    params.repo,
  );

  if ('error' in handledResponse) {
    return res.status(handledResponse.status).json({ error: handledResponse.error });
  }

  const {
    search: { nodes: repositories },
  } = handledResponse;

  const repository = repositories[0];
  if (!repository) {
    res.status(404).json(result);
    return;
  }

  const {
    id: repositoryId,
    discussionCategories: { nodes },
  } = repository;
  const categories = nodes.map(({ emojiHTML, ...rest }) => ({
    emoji: emojiHTML?.match(/">(.*?)<\/g-emoji/)?.[1] || '',
    ...rest,
  }));

  res.status(200).json({ repositoryId, categories });
}
