import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import TableOfContents from './TOC';

interface MobileTOCProps {
  contentSelector?: string;
}

const MobileTOC = ({ contentSelector = '.content' }: MobileTOCProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="mobile-toc-button"
        onClick={() => setIsOpen(true)}
        aria-label="目次を開く"
      >
        <IoMenu size={24} />
      </button>

      {isOpen && (
        <div className="mobile-toc-overlay" onClick={() => setIsOpen(false)}>
          <div 
            className="mobile-toc-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-toc-header">
              <h3>目次</h3>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="目次を閉じる"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="mobile-toc-content">
              <TableOfContents contentSelector={contentSelector} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default MobileTOC;