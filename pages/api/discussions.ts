import type { NextApiRequest, NextApiResponse } from 'next';
import { getDiscussion } from '../../services/github/getDiscussion';
import { adaptDiscussion } from '../../lib/adapter';
import { IGiscussion } from '../../lib/models/adapter';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IGiscussion | { error: string }>,
) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  const params = {
    id: req.query.id as string,
    first: +req.query.first,
    last: +req.query.last,
    after: req.query.after as string,
    before: req.query.before as string,
  };
  if (!params.last && !params.first) {
    params.first = 20;
  }

  const { data } = await getDiscussion(params, token);
  const adapted = adaptDiscussion(data);

  res.status(200).json(adapted);
};
