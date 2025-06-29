import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // 下にスクロール: ヘッダーを隠す
      setIsVisible(false);
    } else {
      // 上にスクロール: ヘッダーを表示
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, handleScroll]);

  return (
    <header
      className={`fixed top-0 w-full bg-black z-10 shadow-md transform transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-screen-xl flex flex-col lg:flex-row justify-between items-center p-2 lg:px-4 gap-1 lg:gap-0">
        <Link
          href="https://akitoshi-lab.com/"
          className="text-lg lg:text-xl text-white no-underline pb-1 leading-tight tracking-wide shadow-lg"
        >
          Akitoshi Lab.
        </Link>
        <nav className="w-full lg:w-auto">
          <ul className="flex justify-center lg:justify-end gap-2 lg:gap-4 m-0 p-0 list-none items-center w-full lg:w-auto">
            <li>
              <Link
                href="https://akitoshi-lab.com/about/"
                className="text-sm lg:text-base text-white no-underline px-2 py-1 rounded transition duration-300 hover:bg-white hover:bg-opacity-20"
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-sm lg:text-base text-white no-underline px-2 py-1 rounded transition duration-300 hover:bg-white hover:bg-opacity-20"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="https://akitoshi-lab.com/works/"
                className="text-sm lg:text-base text-white no-underline px-2 py-1 rounded transition duration-300 hover:bg-white hover:bg-opacity-20"
              >
                Works
              </Link>
            </li>
            <li>
              <Link
                href="https://akitoshi-lab.com/"
                className="text-sm lg:text-base text-white no-underline px-2 py-1 rounded transition duration-300 hover:bg-white hover:bg-opacity-20"
              >
                Gallery
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
