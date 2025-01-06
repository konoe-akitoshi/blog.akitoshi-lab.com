import axios from 'axios';
import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
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
      image: dom.window.document.querySelector('meta[property="og:image"]')?.content || '',
    };
    res.status(200).json(meta);
  } catch (error) {
    console.error('Failed to fetch metadata:', error.message);
    res.status(500).json({ error: 'Failed to fetch metadata' });
  }
}
