import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 text-center py-5 text-lg">
      <ul className="list-none p-0 m-0 flex justify-center space-x-4">
        <li>
          <Link
            href="/copyright/"
            className="text-sm text-white transition-colors duration-300"
          >
            掲載情報について
          </Link>
        </li>
        <li>
          <Link
            href="/disclaimer/"
            className="text-sm text-white transition-colors duration-300"
          >
            免責事項
          </Link>
        </li>
        <li>
          <Link
            href="/privacy/"
            className="text-sm text-white transition-colors duration-300"
          >
            プライバシーポリシー
          </Link>
        </li>
        <li>
          <Link
            href="/inquiry/"
            className="text-sm text-white transition-colors duration-300"
          >
            お問い合わせ
          </Link>
        </li>
      </ul>
      <div className="m-0">
        <p className="text-gray-400 m-0">
          <small>&copy; 2023 Akitoshi Saeki</small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
