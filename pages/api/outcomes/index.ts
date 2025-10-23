import type { NextApiRequest, NextApiResponse } from 'next';
import { getOutcomes, addOutcome } from '../../../lib/data';

function isAuthenticated(req: NextApiRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const token = req.cookies.admin_token;
  return token === Buffer.from(adminPassword).toString('base64');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const outcomes = getOutcomes();
    return res.status(200).json(outcomes);
  }

  if (req.method === 'POST') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { field, narrative, duration, keyMilestone } = req.body;
    
    if (!field || !narrative || !duration || !keyMilestone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newOutcome = addOutcome({ field, narrative, duration, keyMilestone });
    return res.status(201).json(newOutcome);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

