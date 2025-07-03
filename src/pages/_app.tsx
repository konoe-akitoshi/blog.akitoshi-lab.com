import '../styles/global.css';
import 'zenn-content-css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from '@/types';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

const trackPageView = (url: string) => {
  if (window.gtag) {
    window.gtag('config', GA_TRACKING_ID, { page_path: url });
  }
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!GA_TRACKING_ID) {
      console.warn('Google Analytics Tracking ID is missing!');
      return;
    }

    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (GA_TRACKING_ID) {
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
    }
  }, []);

  useEffect(() => {
    // Zenn埋め込み要素を初期化
    import('zenn-embed-elements').then((module) => {
      if (typeof module.activateElements === 'function') {
        module.activateElements();
      } else {
        console.warn('Failed to activate Zenn embed elements.');
      }
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <>
        <Header />
        <main className="content-wrapper">
          <Component {...pageProps} />
        </main>
        <Footer />
      </>
    </SessionProvider>
  );
}

export default MyApp;