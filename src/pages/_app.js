import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main className="container content-wrapper">
        <Component {...pageProps} />
      </main>
      <Navbar />
      <Footer />
    </>
  );
}

export default MyApp;
