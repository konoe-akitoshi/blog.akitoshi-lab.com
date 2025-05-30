'use client';

import React, { useEffect } from 'react';
import markdownToHtml from 'zenn-markdown-html';
import 'zenn-content-css';

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  useEffect(() => {
    async function activateZenn() {
      try {
        const module = await import('zenn-embed-elements');
        const zennModule = module.default || module;
        if (typeof (zennModule as any).activateElements === 'function') {
          (zennModule as any).activateElements();
        } else if (typeof (zennModule as any).init === 'function') {
          (zennModule as any).init();
        } else {
          console.warn('Zenn embed elements are not available.');
        }
      } catch (error) {
        console.error('Error activating Zenn embed elements', error);
      }
    }
    activateZenn();
  }, []);

  // MarkdownをHTMLに変換 (埋め込みサーバーを指定)
  const processedContent = React.useMemo(() => {
    return markdownToHtml(content, {
      embedOrigin: 'https://embed.zenn.studio',
      customEmbed: {}
    });
  }, [content]);

  return (
    <div
      className="zenn-content znc markdown mt-8"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default PostContent;
