import { useEffect } from 'react';
import tocbot from 'tocbot';
import 'tocbot/dist/tocbot.css';

const TableOfContents = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.content',
      headingSelector: 'h1, h2, h3',
      collapseDepth: 6,
    });

    return () => {
      tocbot.destroy();
    };
  }, []);

  return (
    <div className="w-1/4">
      <div className="toc p-4 bg-gray-100 rounded-lg shadow-lg sticky top-8"></div>
    </div>
  );
};

export default TableOfContents;
