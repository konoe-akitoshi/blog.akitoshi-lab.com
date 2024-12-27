import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <>
        <Header />
        <div className="h-20"></div>
        <main className="content-wrapper">
          <Component {...pageProps} />
        </main>
        <Footer />
      </>
    </SessionProvider>
  );
}

export default MyApp;
