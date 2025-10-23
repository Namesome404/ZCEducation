import type { NextApiRequest, NextApiResponse } from 'next';
import { updateOutcome, deleteOutcome } from '../../../lib/data';

function isAuthenticated(req: NextApiRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const token = req.cookies.admin_token;
  return token === Buffer.from(adminPassword).toString('base64');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const outcomeId = parseInt(id as string, 10);

  if (isNaN(outcomeId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'PUT') {
    const { field, narrative, duration, keyMilestone } = req.body;
    const updated = updateOutcome(outcomeId, { field, narrative, duration, keyMilestone });
    
    if (!updated) {
      return res.status(404).json({ error: 'Outcome not found' });
    }
    
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    const deleted = deleteOutcome(outcomeId);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Outcome not found' });
    }
    
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

