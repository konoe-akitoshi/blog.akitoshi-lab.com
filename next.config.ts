import type { NextConfig } from "next";

// 環境変数からホスト名を取得
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_HOST = SUPABASE_URL ? new URL(SUPABASE_URL).hostname : '';

const nextConfig: NextConfig = {
  // Dockerコンテナ用の設定
  output: 'standalone',
  
  images: {
    domains: [
      SUPABASE_HOST, // 動的に Supabase のホストを追加
      'localhost',
    ].filter(Boolean),
  },
  
  // 実験的機能
  experimental: {
    // サーバーアクションの有効化
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
