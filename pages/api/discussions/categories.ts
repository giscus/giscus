import type { NextApiRequest, NextApiResponse } from 'next';
import { ICategories } from '../../../lib/types/adapter';
import { getDiscussionCategories } from '../../../services/github/getDiscussionCategories';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ICategories | { error: string }>,
) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  const params = { repo: req.query.repo as string };
  const result = { repositoryId: '', categories: [] };

  const response = await getDiscussionCategories(params, token);

  if ('message' in response) {
    res.status(500).json({ error: response.message });
    return;
  }

  const {
    data: {
      search: { nodes: repositories },
    },
  } = response;

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
    emoji: emojiHTML?.match(/">(.*?)<\/g-emoji/)[1] || '',
    ...rest,
  }));

  res.status(200).json({ repositoryId, categories });
};
