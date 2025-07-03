import axios from 'axios';
import { JSDOM } from 'jsdom';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MyBot/1.0)',
      },
      timeout: 10000,
    });
    const dom = new JSDOM(response.data);
    const meta = {
      title: dom.window.document.querySelector('title')?.textContent || '',
      image: (dom.window.document.querySelector('meta[property="og:image"]') as HTMLMetaElement)?.content || '',
    };
    res.status(200).json(meta);
  } catch (error) {
    console.error('Failed to fetch metadata:', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({ error: 'Failed to fetch metadata' });
  }
}
