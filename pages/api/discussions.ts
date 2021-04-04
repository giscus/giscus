import type { NextApiRequest, NextApiResponse } from 'next';
import { getDiscussion } from '../../services/github/getDiscussion';
import { adaptDiscussions } from '../../lib/adapter';
import { IGiscussion } from '../../lib/models/adapter';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IGiscussion | { error: string }>,
) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  const params = { id: req.query.id as string };

  const { data } = await getDiscussion(params, token);
  const adapted = adaptDiscussions(data);

  res.status(200).json(adapted);
};
