import type { NextApiRequest, NextApiResponse } from 'next';
import { getContacts, addContact } from '../../../lib/data';

function isAuthenticated(req: NextApiRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const token = req.cookies.admin_token;
  return token === Buffer.from(adminPassword).toString('base64');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const contacts = getContacts();
    return res.status(200).json(contacts);
  }

  if (req.method === 'POST') {
    const { background, timeline, interest, contact } = req.body;
    
    if (!background || !timeline || !interest || !contact) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newContact = addContact({ background, timeline, interest, contact });
    return res.status(201).json(newContact);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

