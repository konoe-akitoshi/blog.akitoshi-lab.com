// components/TableOfContents.js
import { useEffect } from 'react';
import tocbot from 'tocbot';
import 'tocbot/dist/tocbot.css';
import PropTypes from 'prop-types';

const TableOfContents = ({
  tocSelector = '.toc-desktop', // デスクトップ用セレクターに変更
  contentSelector = '.content',
  headingSelector = 'h1, h2, h3, h4', // 必要に応じて調整
  collapseDepth = 6,
  ...rest
}) => {
  useEffect(() => {
    tocbot.init({
      tocSelector,
      contentSelector,
      headingSelector,
      collapseDepth,
      ...rest,
    });
    return () => {
      tocbot.destroy();
    };
  }, [tocSelector, contentSelector, headingSelector, collapseDepth, rest]);

  return (
    <div className={`${tocSelector.replace('.', '')} p-4 bg-gray-100 rounded-lg shadow-lg`}></div>
  );
};

TableOfContents.propTypes = {
  tocSelector: PropTypes.string,
  contentSelector: PropTypes.string,
  headingSelector: PropTypes.string,
  collapseDepth: PropTypes.number,
};

export default TableOfContents;
