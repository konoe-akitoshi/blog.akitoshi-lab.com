'use client';

import React, { useEffect } from 'react';
import markdownToHtml from 'zenn-markdown-html';
import 'zenn-content-css';

const PostContent = ({ content }) => {
  useEffect(() => {
    // 数式や埋め込みコンテンツをブラウザ側でレンダリング
    import('zenn-embed-elements').then((module) => {
      if (module.activateElements) {
        module.activateElements();
      } else {
        console.error('Failed to activate Zenn embed elements');
      }
    });
  }, []);

  // MarkdownをHTMLに変換 (埋め込みサーバーを指定)
  const processedContent = markdownToHtml(content, {
    embedOrigin: 'https://embed.zenn.studio',
    customEmbed: {
    },
  });

  return (
    <div
      className="zenn-content znc markdown mt-8"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default PostContent;
