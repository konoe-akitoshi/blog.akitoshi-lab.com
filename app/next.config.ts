import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dockerコンテナ用の設定
  output: 'standalone',
  
  images: {
    domains: [
      'localhost',
    ],
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
