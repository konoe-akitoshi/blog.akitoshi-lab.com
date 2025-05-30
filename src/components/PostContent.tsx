'use client';

import React, { useEffect } from 'react';
import markdownToHtml from 'zenn-markdown-html';
import 'zenn-content-css';

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  useEffect(() => {
    // 数式や埋め込みコンテンツをブラウザ側でレンダリング
    import('zenn-embed-elements').then((module: any) => {
      const zennModule = module.default || module;
      
      if (typeof zennModule.activateElements === 'function') {
        zennModule.activateElements();
      } else {
        console.error('Failed to activate Zenn embed elements');
      }
    });
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
