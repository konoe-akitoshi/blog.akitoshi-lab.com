import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-mono-900 text-center px-2 pt-2 sm:pt-3 pb-3 text-mono-300 text-base leading-tight box-border" aria-label="フッター">
      <ul className="flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5 list-none p-0 m-0 mb-3 max-w-2xl mx-auto">
        <li className="flex items-center">
          <Link
            href="/copyright/"
            className="no-underline px-2.5 py-1 rounded text-mono-300 text-[0.97em] transition-colors duration-150 outline-none inline-block hover:bg-mono-800 hover:text-white focus:bg-mono-800 focus:text-white"
            tabIndex={0}
          >
            掲載情報について
          </Link>
          <span className="mx-1 text-mono-800 opacity-40 last:hidden">|</span>
        </li>
        <li className="flex items-center">
          <Link
            href="/disclaimer/"
            className="no-underline px-2.5 py-1 rounded text-mono-300 text-[0.97em] transition-colors duration-150 outline-none inline-block hover:bg-mono-800 hover:text-white focus:bg-mono-800 focus:text-white"
            tabIndex={0}
          >
            免責事項
          </Link>
          <span className="mx-1 text-mono-800 opacity-40 last:hidden">|</span>
        </li>
        <li className="flex items-center">
          <Link
            href="/privacy/"
            className="no-underline px-2.5 py-1 rounded text-mono-300 text-[0.97em] transition-colors duration-150 outline-none inline-block hover:bg-mono-800 hover:text-white focus:bg-mono-800 focus:text-white"
            tabIndex={0}
          >
            プライバシーポリシー
          </Link>
          <span className="mx-1 text-mono-800 opacity-40 last:hidden">|</span>
        </li>
        <li className="flex items-center">
          <Link
            href="/inquiry/"
            className="no-underline px-2.5 py-1 rounded text-mono-300 text-[0.97em] transition-colors duration-150 outline-none inline-block hover:bg-mono-800 hover:text-white focus:bg-mono-800 focus:text-white"
            tabIndex={0}
          >
            お問い合わせ
          </Link>
        </li>
      </ul>
      <div className="border-t border-mono-800 border-opacity-40 mt-0 pt-0 px-0 max-w-2xl mx-auto">
        <p className="m-0 text-[0.91em] sm:text-[0.94em] text-mono-400 tracking-wide">
          <small>© 2021 Akitoshi Saeki</small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;