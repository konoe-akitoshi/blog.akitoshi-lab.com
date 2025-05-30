'use client';

import React, { useState, useRef, useEffect } from 'react';
import TableOfContents from './TOC';
import { IoClose, IoListOutline } from 'react-icons/io5';
import FocusTrap from 'focus-trap-react';

interface MobileTOCButtonProps {
  contentSelector?: string;
  headingSelector?: string;
}

const MobileTOCButton: React.FC<MobileTOCButtonProps> = ({
  contentSelector = '.content',
  headingSelector = 'h1, h2, h3, h4',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openTOC = () => setIsOpen(true);
  const closeTOC = () => setIsOpen(false);

  // モーダル外をクリックしたときに閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeTOC();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeTOC();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // 背景のスクロールを防止
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* モバイル用TOCボタン */}
      <button
        className={`
          fixed bottom-6 right-6 z-50 
          w-12 h-12 
          bg-gray-800 
          text-white rounded-full shadow-lg 
          lg:hidden 
          transition-all duration-300 
          hover:shadow-xl hover:scale-105 
          focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2
          ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
        onClick={openTOC}
        aria-label="目次を開く"
      >
        <IoListOutline size={20} className="mx-auto" />
      </button>

      {/* モーダル */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          aria-modal="true" 
          role="dialog" 
          aria-labelledby="mobile-toc-title"
        >
          {/* 背景のオーバーレイ */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeTOC}
          />

          {/* モーダル本体 - 下からスライドイン */}
          <FocusTrap active={isOpen}>
            <div className="absolute inset-x-0 bottom-0">
              <div
                ref={modalRef}
                className="relative bg-white rounded-t-3xl shadow-2xl transform transition-all duration-300 animate-slide-up max-h-[80vh]"
              >
                {/* ドラッグハンドル */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-12 h-1 bg-gray-300 rounded-full" />
                </div>

                {/* ヘッダー */}
                <div className="flex items-center justify-between px-6 pb-3">
                  <h2 
                    id="mobile-toc-title" 
                    className="text-base font-medium text-gray-700"
                  >
                    目次
                  </h2>
                  <button
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                    onClick={closeTOC}
                    aria-label="閉じる"
                  >
                    <IoClose size={20} />
                  </button>
                </div>

                {/* 目次内容 */}
                <div className="px-6 pb-6 max-h-[65vh] overflow-y-auto">
                  <TableOfContents
                    contentSelector={contentSelector}
                    headingSelector={headingSelector}
                    className="toc-mobile [&_.toc]:shadow-none [&_.toc>div]:p-0 [&_.toc>div]:bg-transparent"
                  />
                </div>
              </div>
            </div>
          </FocusTrap>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
};

export default MobileTOCButton;
