import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === adminPassword) {
    // 设置session cookie (简化版，生产环境应使用更安全的方式)
    res.setHeader('Set-Cookie', `admin_token=${Buffer.from(adminPassword).toString('base64')}; Path=/; HttpOnly; Max-Age=86400`);
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ error: 'Invalid password' });
}

