import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/global.css';
import 'zenn-content-css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Analytics } from '../components/Analytics';
import { ZennEmbedInitializer } from '../components/ZennEmbedInitializer';
import { AuthProvider } from '../components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Akitoshi Lab.',
  description: 'Akitoshi Labのブログサイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <script
          async
          src="https://embed.zenn.studio/js/listen-embed-event.js"
        ></script>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <div className="h-20"></div>
          <main className="content-wrapper">
            {children}
          </main>
          <Footer />
          <Analytics />
          <ZennEmbedInitializer />
        </AuthProvider>
      </body>
    </html>
  );
}
