import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Note from './Note';
import LinkCard from './LinkCard';

// preprocessContent関数
const preprocessContent = (content) => {
  return content.replace(
    /:::(note) (\w+)\n([\s\S]*?)\n:::/g,
    (_, blockType, type, text) => {
      return `<div class="note" data-type="${type}">${text}</div>`;
    }
  );
};

// PostContentコンポーネント
const PostContent = ({ content }) => {
  const urlRegex = /(?:\n|^)(https?:\/\/[^\s]+)(?:\n|$)/g;

  const transformContent = (content) => {
    const matches = [];
    let match;
    while ((match = urlRegex.exec(content)) !== null) {
      matches.push({
        url: match[1],
        index: match.index,
      });
    }

    const elements = [];
    let lastIndex = 0;

    matches.forEach((match) => {
      const textBefore = content.slice(lastIndex, match.index).trim();
      if (textBefore) {
        elements.push(
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSlug]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              div({ node, className, children, ...props }) {
                if (className === 'note') {
                  const type =
                    node.properties?.dataType || node.properties?.type || 'info';
                  return <Note type={type}>{children}</Note>;
                }
                return <div {...props}>{children}</div>;
              },
            }}
          >
            {textBefore}
          </ReactMarkdown>
        );
      }

      elements.push(<LinkCard url={match.url} key={match.index} />);
      lastIndex = match.index + match.url.length + 1;
    });

    const remainingText = content.slice(lastIndex).trim();
    if (remainingText) {
      elements.push(
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSlug]}
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            div({ node, className, children, ...props }) {
              if (className === 'note') {
                const type =
                  node.properties?.dataType || node.properties?.type || 'info';
                return <Note type={type}>{children}</Note>;
              }
              return <div {...props}>{children}</div>;
            },
          }}
        >
          {remainingText}
        </ReactMarkdown>
      );
    }

    return elements;
  };

  const processedContent = preprocessContent(content);

  return <div className="markdown mt-8">{transformContent(processedContent)}</div>;
};

export default PostContent;
