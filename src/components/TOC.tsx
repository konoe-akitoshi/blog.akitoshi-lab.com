'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentSelector?: string;
  headingSelector?: string;
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  contentSelector = '.content',
  headingSelector = 'h1, h2, h3, h4',
  className = '',
}) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const pathname = usePathname();

  // ヘッディングを取得
  useEffect(() => {
    const content = document.querySelector(contentSelector);
    if (!content) return;

    const elements = content.querySelectorAll(headingSelector);
    const headingData: Heading[] = Array.from(elements).map((element) => {
      const heading = element as HTMLHeadingElement;
      // IDがない場合は生成
      if (!heading.id) {
        heading.id = heading.textContent
          ?.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-') || '';
      }
      return {
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      };
    });

    setHeadings(headingData);
  }, [contentSelector, headingSelector, pathname]);

  // スクロール位置を監視してアクティブなセクションを更新
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // オフセット

      let currentActiveId = '';
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element && element.offsetTop <= scrollPosition) {
          currentActiveId = heading.id;
        }
      }
      setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期位置を設定

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // スムーズスクロール
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // ヘッダーの高さを考慮
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  }, []);

  if (headings.length === 0) {
    return null;
  }

  // 最小レベルを基準にインデントを計算
  const minLevel = Math.min(...headings.map(h => h.level));

  return (
    <nav className={`toc ${className} w-56`} aria-label="目次">
      <div className="bg-gray-100 rounded-lg shadow-lg p-4">
          <ul className="m-0 space-y-1 list-none pl-0">
            {headings.map((heading) => {
              const indent = (heading.level - minLevel) * 16;
              const isActive = activeId === heading.id;
              
              return (
                <li
                  key={heading.id}
                  style={{ paddingLeft: `${indent}px` }}
                  className="relative"
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleClick(e, heading.id)}
                    className={`
                      block py-2 px-3 text-sm rounded transition-all duration-200
                      ${isActive 
                        ? 'bg-gray-200 text-gray-900 font-medium' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                      }
                    `}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
      </div>
    </nav>
  );
};

export default TableOfContents;
