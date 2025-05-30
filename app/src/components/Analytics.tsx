'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analyticsの型定義
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      params?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_TRACKING_ID) {
      console.warn('Google Analytics Tracking ID is missing!');
      return;
    }

    // GA4のスクリプトを挿入
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // 初期化
    const scriptInit = document.createElement('script');
    scriptInit.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
    `;
    document.head.appendChild(scriptInit);
  }, []);

  useEffect(() => {
    if (!GA_TRACKING_ID || !window.gtag || !searchParams) return;

    // URLが変更されたときにページビューを送信
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    window.gtag('config', GA_TRACKING_ID, { page_path: url });
  }, [pathname, searchParams]);

  return null;
}
