import '../styles/globals.css';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <a href="/" className="font-bold text-lg">My Blog</a>
          </nav>
        </div>
      </header>
      <main className="container content-wrapper">
        <Component {...pageProps} />
      </main>
      <Navbar />
      <footer>
        <div className="container">
          <p>&copy; 2024 My Blog. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default MyApp;
