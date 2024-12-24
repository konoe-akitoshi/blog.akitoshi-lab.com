import type { NextConfig } from "next";

// 環境変数からホスト名を取得
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_HOST = SUPABASE_URL ? new URL(SUPABASE_URL).hostname : '';

const nextConfig: NextConfig = {
  images: {
    domains: [SUPABASE_HOST], // 動的に Supabase のホストを追加
  },
};

export default nextConfig;
