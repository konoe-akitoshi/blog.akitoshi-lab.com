'use client';

import React, { useEffect } from 'react';
import * as tocbot from 'tocbot';
import 'tocbot/dist/tocbot.css';

interface TableOfContentsProps {
  tocSelector?: string;
  contentSelector?: string;
  headingSelector?: string;
  collapseDepth?: number;
  [key: string]: any;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
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
    <div className={`${tocSelector.replace('.', '')} p-4 bg-gray-100 rounded-lg shadow-lg`} />
  );
};

export default TableOfContents;
