import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TableOfContents = ({ contentSelector = '.content' }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const contentElement = document.querySelector(contentSelector);
    if (!contentElement) return;

    const headingElements = contentElement.querySelectorAll('h1, h2, h3, h4');
    const headingData = Array.from(headingElements).map((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
      return {
        id: heading.id,
        text: heading.textContent,
        level: parseInt(heading.tagName[1])
      };
    });

    setHeadings(headingData);

    const observerOptions = {
      rootMargin: '-20% 0% -35% 0%',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [contentSelector]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="toc-container">
      <div className="toc-grid">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={`toc-item toc-level-${heading.level} ${
              activeId === heading.id ? 'toc-active' : ''
            }`}
          >
            {heading.text}
          </button>
        ))}
      </div>
    </div>
  );
};

TableOfContents.propTypes = {
  contentSelector: PropTypes.string
};

export default TableOfContents;