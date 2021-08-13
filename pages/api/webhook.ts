import type { NextApiRequest, NextApiResponse } from 'next';

// This is not used at all, but it is a requirement for the app
// to be listed on the marketplace.

export default async function WebhookApi(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ success: true });
}
