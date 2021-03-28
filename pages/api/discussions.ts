import type { NextApiRequest, NextApiResponse } from 'next';
import { getDiscussions, GetDiscussionsParams } from '../../services/github/getDiscussions';
import { adaptDiscussions } from '../../lib/adapter';
import { IGiscussion } from '../../lib/models/adapter';
import { env } from '../../lib/variables';

export default async (req: NextApiRequest, res: NextApiResponse<IGiscussion>) => {
  const params: GetDiscussionsParams = {
    repositoryOwner: req.query.repositoryOwner as string,
    repositoryName: req.query.repositoryName as string,
    discussionNumber: +req.query.discussionNumber,
  };

  const { data } = await getDiscussions(params, env.token);
  const adapted = adaptDiscussions(data);

  res.status(200).json(adapted);
};
