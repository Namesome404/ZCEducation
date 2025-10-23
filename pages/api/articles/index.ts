import type { NextApiRequest, NextApiResponse } from 'next';
import { getArticles, addArticle } from '../../../lib/data';

function isAuthenticated(req: NextApiRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const token = req.cookies.admin_token;
  return token === Buffer.from(adminPassword).toString('base64');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const articles = getArticles();
    return res.status(200).json(articles);
  }

  if (req.method === 'POST') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { title, date, excerpt, readTime, content } = req.body;
    
    if (!title || !date || !excerpt || !readTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newArticle = addArticle({ title, date, excerpt, readTime, content: content || '' });
    return res.status(201).json(newArticle);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

