import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { JSDOM } from 'jsdom';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const { data } = await axios.get(url, { timeout: 5000 });
    const dom = new JSDOM(data);
    const meta = dom.window.document.querySelectorAll('meta');

    const ogp: Record<string, string> = {};
    meta.forEach((el) => {
      const property = el.getAttribute('property');
      const content = el.getAttribute('content');
      if (property && content) {
        ogp[property] = content;
      }
    });

    res.status(200).json({
      title: ogp['og:title'] || dom.window.document.title,
      description: ogp['og:description'] || '',
      image: ogp['og:image'] || '',
      url: url,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch OGP data' });
  }
}
