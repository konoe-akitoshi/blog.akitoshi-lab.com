'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import TableOfContents and MobileTOCButton to prevent SSR
const TableOfContents = dynamic(() => import('./TOC'), { ssr: false });
const MobileTOCButton = dynamic(() => import('./MobileTOCButton'), { ssr: false });

interface ClientTOCProps {
  children: ReactNode;
}

export default function ClientTOC({ children }: ClientTOCProps) {
  return (
    <>
      <div className="relative flex gap-8">
        {/* メインコンテンツ */}
        <div className="w-full lg:w-3/4 content">
          {children}
        </div>
        
        {/* デスクトップ用TOC */}
        <aside className="hidden lg:block lg:w-1/4">
          <div className="sticky top-24">
            <TableOfContents
              contentSelector=".content"
              headingSelector="h1, h2, h3, h4"
              className="toc-desktop"
            />
          </div>
        </aside>
      </div>

      {/* モバイル用TOCボタン */}
      <MobileTOCButton
        contentSelector=".content"
        headingSelector="h1, h2, h3, h4"
      />
    </>
  );
}
