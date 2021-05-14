import type { NextApiRequest, NextApiResponse } from 'next';
import { getDiscussion } from '../../../services/github/getDiscussion';
import { adaptDiscussion } from '../../../lib/adapter';
import { IGiscussion } from '../../../lib/types/adapter';
import { createDiscussion } from '../../../services/github/createDiscussion';
import { GRepositoryDiscussion } from '../../../lib/types/github';

async function get(req: NextApiRequest, res: NextApiResponse<IGiscussion | { error: string }>) {
  const token = req.headers.authorization?.split('Bearer ')[1];

  const params = {
    repo: req.query.repo as string,
    term: req.query.term as string,
    number: +req.query.number,
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
    const code = response.message.includes('not installed') ? 403 : 500;
    res.status(code).json({ error: response.message });
    return;
  }

  const { data } = response;
  const { viewer } = data;

  let discussion: GRepositoryDiscussion;
  if ('search' in data) {
    const { search } = data;
    const { discussionCount, nodes } = search;
    discussion = discussionCount > 0 ? nodes[0] : null;
  } else {
    discussion = data.repository.discussion;
  }

  if (!discussion) {
    res.status(404).json({ error: 'Discussion not found' });
    return;
  }

  const adapted = adaptDiscussion({ viewer, discussion });
  res.status(200).json(adapted);
}

async function post(req: NextApiRequest, res: NextApiResponse<{ id: string } | { error: string }>) {
  const { repo, input } = req.body;
  const response = await createDiscussion(repo, { input });
  const id = response?.data?.createDiscussion?.discussion?.id;

  if (!id) {
    res.status(400).json({ error: 'Unable to create discussion with request body.' });
    return;
  }

  res.status(200).json({ id });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await post(req, res);
    return;
  }
  await get(req, res);
};
