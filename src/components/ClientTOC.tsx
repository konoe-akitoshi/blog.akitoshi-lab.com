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
      <div className="flex gap-8">
        <div className="w-full md:w-3/4 content">
          {children}
        </div>
        <div className="hidden md:block md:w-1/4">
          <div className="sticky top-8">
            <TableOfContents
              tocSelector=".toc-desktop"
              contentSelector=".content"
              headingSelector="h1, h2, h3, h4"
              collapseDepth={4}
            />
          </div>
        </div>
      </div>

      <MobileTOCButton
        tocSelector=".toc-mobile"
        contentSelector=".content"
        headingSelector="h1, h2, h3, h4"
        collapseDepth={4}
      />
    </>
  );
}
