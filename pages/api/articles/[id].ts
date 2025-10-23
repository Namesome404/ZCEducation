import type { NextApiRequest, NextApiResponse } from 'next';
import { updateArticle, deleteArticle } from '../../../lib/data';

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
  const articleId = parseInt(id as string, 10);

  if (isNaN(articleId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'PUT') {
    const { title, date, excerpt, readTime, content } = req.body;
    const updated = updateArticle(articleId, { title, date, excerpt, readTime, content });
    
    if (!updated) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    const deleted = deleteArticle(articleId);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

