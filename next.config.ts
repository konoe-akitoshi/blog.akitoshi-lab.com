import type { NextConfig } from "next";

// 環境変数からホスト名を取得
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_HOST = SUPABASE_URL ? new URL(SUPABASE_URL).hostname : '';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: SUPABASE_HOST,
      },
    ],
  },
};

export default nextConfig;
