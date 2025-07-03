import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // 下にスクロール: ヘッダーを隠す
      setIsVisible(false);
    } else {
      // 上にスクロール: ヘッダーを表示
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-10 shadow-sm transition-transform ease-in-out duration-300 bg-[#181A1B] pt-2 sm:pt-3 pb-3 lg:pt-4 lg:pb-5 transform ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto max-w-4xl flex flex-col lg:flex-row justify-between items-center px-4 lg:px-12 gap-2">
          <Link
            href="/"
            className="text-xl lg:text-2xl mb-0"
            style={{ color: '#E0E0E0', textDecoration: 'none', lineHeight: '1.1', letterSpacing: '0.03em', outline: 'none' }}
          >
            Akitoshi Lab.
          </Link>
          <nav className="w-full lg:w-auto" aria-label="メインナビゲーション">
            <ul className="flex flex-wrap justify-center lg:justify-end gap-x-2 gap-y-0.5 m-0 p-0 list-none items-center w-full lg:w-auto mb-0">
              <li className="m-0 p-0">
                <Link
                  href="/about/"
                  className="text-gray-200 bg-none no-underline px-2.5 py-1 rounded font-medium text-[0.98em] transition-colors duration-150 outline-none inline-block leading-tight hover:bg-[#232425] hover:text-white focus:bg-[#232425] focus:text-white"
                >
                  ABOUT
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  href="https://blog.akitoshi-lab.com/"
                  className="text-gray-200 bg-none no-underline px-2.5 py-1 rounded font-medium text-[0.98em] transition-colors duration-150 outline-none inline-block leading-tight hover:bg-[#232425] hover:text-white focus:bg-[#232425] focus:text-white"
                >
                  Blog
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  href="/works/"
                  className="text-gray-200 bg-none no-underline px-2.5 py-1 rounded font-medium text-[0.98em] transition-colors duration-150 outline-none inline-block leading-tight hover:bg-[#232425] hover:text-white focus:bg-[#232425] focus:text-white"
                >
                  Works
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  href="/gallery/"
                  className="text-gray-200 bg-none no-underline px-2.5 py-1 rounded font-medium text-[0.98em] transition-colors duration-150 outline-none inline-block leading-tight hover:bg-[#232425] hover:text-white focus:bg-[#232425] focus:text-white"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="h-[52px] sm:h-[48px] md:h-[76px] lg:h-[56px]"></div>
    </>
  );
};

export default Header;