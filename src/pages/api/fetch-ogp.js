import ogs from 'open-graph-scraper';
import { URL } from 'url';

export default async function handler(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const options = { url };
    const { result } = await ogs(options);

    if (result.error) {
      return res.status(500).json({ error: 'Failed to fetch OGP data' });
    }

    // Base URL の取得
    const baseUrl = new URL(url).origin;

    // 画像処理
    let ogImage = result.ogImage?.url || ''; // 画像URL
    if (ogImage && !ogImage.startsWith('http')) {
      ogImage = new URL(ogImage, baseUrl).href; // 相対パスを絶対パスに変換
    }

    // デフォルト画像を設定
    if (!ogImage) {
      ogImage = `${baseUrl}/default-image.jpg`; // デフォルト画像（必要に応じて変更）
    }

    return res.status(200).json({
      title: result.ogTitle || 'No Title',
      description: result.ogDescription || 'No Description',
      image: ogImage,
      url: result.ogUrl || url,
    });
  } catch (error) {
    console.error('Error fetching OGP:', error.message);
    return res.status(500).json({ error: 'Server error' });
  }
}
