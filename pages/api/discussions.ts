import type { NextApiRequest, NextApiResponse } from 'next';
import { getDiscussion } from '../../services/github/getDiscussion';
import { adaptDiscussion } from '../../lib/adapter';
import { IGiscussion } from '../../lib/types/adapter';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IGiscussion | { error: string }>,
) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  const params = {
    repo: req.query.repo as string,
    term: req.query.term as string,
    first: +req.query.first,
    last: +req.query.last,
    after: req.query.after as string,
    before: req.query.before as string,
  };
  if (!params.last && !params.first) {
    params.first = 20;
  }

  const response = await getDiscussion(params, token);
  if ('message' in response) {
    res.status(500).json({ error: response.message });
    return;
  }

  const {
    data: {
      viewer,
      search: { discussionCount, nodes },
    },
  } = response;
  const discussion = discussionCount > 0 ? nodes[0] : null;

  const adapted = adaptDiscussion({ viewer, discussion });

  res.status(200).json(adapted);
};
