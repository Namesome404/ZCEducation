import type { NextApiRequest, NextApiResponse } from 'next';
import { updateContact, deleteContact } from '../../../lib/data';

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
  const contactId = parseInt(id as string, 10);

  if (isNaN(contactId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'PUT') {
    const { status, notes } = req.body;
    const updated = updateContact(contactId, { status, notes });
    
    if (!updated) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    const deleted = deleteContact(contactId);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

