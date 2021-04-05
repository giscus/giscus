import type { NextApiRequest, NextApiResponse } from 'next';

const GITHUB_API_URL = 'https://api.github.com/graphql';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  const data = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'GraphQL-Features': 'discussions_api',
    },
    body: JSON.stringify(req.body),
  }).then((r) => r.json());

  res.status(200).json(data);
};
