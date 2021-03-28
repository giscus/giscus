import type { NextApiRequest, NextApiResponse } from 'next';
import { getDiscussions, GetDiscussionsParams } from '../../services/github/getDiscussions';
import { adaptDiscussions } from '../../lib/adapter';
import { IGiscussion } from '../../lib/models/adapter';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IGiscussion | { error: string }>,
) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  const params: GetDiscussionsParams = {
    repositoryOwner: req.query.repositoryOwner as string,
    repositoryName: req.query.repositoryName as string,
    discussionNumber: +req.query.discussionNumber,
  };

  const { data } = await getDiscussions(params, token);
  const adapted = adaptDiscussions(data);

  res.status(200).json(adapted);
};
