// components/MobileTOCButton.js
import { useState, useRef, useEffect } from 'react';
import TableOfContents from './TOC';
import { IoClose, IoMenu } from 'react-icons/io5';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

const MobileTOCButton = ({
  tocSelector = '.toc-mobile', // クラス名を統一
  contentSelector = '.content',
  headingSelector = 'h1, h2, h3, h4',
  collapseDepth = 4,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const openTOC = () => setIsOpen(true);
  const closeTOC = () => setIsOpen(false);

  // モーダル外をクリックしたときに閉じる
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeTOC();
      }
    };

    const handleKeyDown = (event) => {
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
      {/* モバイル用TOCボタン: モーダルが開いていない時のみ表示 */}
      {!isOpen && (
        <button
          className="fixed bottom-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg md:hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={openTOC}
          aria-label="目次を開く"
        >
          <IoMenu size={24} />
        </button>
      )}

      {/* 吹き出しモーダル */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-end p-4 md:hidden transition-opacity duration-300 ease-in-out opacity-100 visible" aria-modal="true" role="dialog" aria-labelledby="toc-title">
          {/* 背景のオーバーレイ */}
          <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out opacity-30 visible" onClick={closeTOC}></div>

          {/* 吹き出し本体 */}
          <FocusTrap active={isOpen}>
            <div
              ref={modalRef}
              className="relative bg-white rounded-lg shadow-lg w-80 max-h-80 overflow-y-auto p-4 transform transition-transform duration-300 ease-in-out translate-y-0 opacity-100"
            >
              {/* 吹き出しの尾 */}
              <div className="absolute bottom-full right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>

              {/* ヘッダー */}
              <div className="flex items-center justify-between mb-4">
                <h2 id="toc-title" className="text-lg font-semibold">目次</h2>
                <button
                  className="text-gray-700 focus:outline-none"
                  onClick={closeTOC}
                  aria-label="目次を閉じる"
                >
                  <IoClose size={24} />
                </button>
              </div>

              {/* 目次内容 */}
              <TableOfContents
                tocSelector={tocSelector}
                contentSelector={contentSelector}
                headingSelector={headingSelector}
                collapseDepth={collapseDepth}
                {...rest}
              />
            </div>
          </FocusTrap>
        </div>
      )}
    </>
  );
};

MobileTOCButton.propTypes = {
  tocSelector: PropTypes.string,
  contentSelector: PropTypes.string,
  headingSelector: PropTypes.string,
  collapseDepth: PropTypes.number,
};

export default MobileTOCButton;
