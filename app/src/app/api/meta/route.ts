import axios from 'axios';
import { JSDOM } from 'jsdom';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
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
      image: dom.window.document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '',
      description: dom.window.document.querySelector('meta[name="description"]')?.getAttribute('content') || 
                  dom.window.document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '',
    };
    return NextResponse.json(meta);
  } catch (error) {
    console.error('Failed to fetch metadata:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
}
