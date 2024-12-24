import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FaInfoCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import OGPCard from './OGPCard'; // OGPCardをインポート

// ノートブロックの事前処理
const preprocessContent = (content) => {
  return content.replace(
    /:::(note) (\w+)\n([\s\S]*?)\n:::/g,
    (_, blockType, type, text) => {
      return `<div class="note" data-type="${type}">${text}</div>`;
    }
  );
};

// ノートブロックコンポーネント
const Note = ({ type, children }) => {
  const styles = {
    info: {
      color: 'text-blue-700',
      bg: 'bg-blue-100',
      border: 'border-blue-500',
      icon: <FaInfoCircle className="text-blue-500 mr-2" />,
    },
    warn: {
      color: 'text-yellow-700',
      bg: 'bg-yellow-100',
      border: 'border-yellow-500',
      icon: <FaExclamationTriangle className="text-yellow-500 mr-2" />,
    },
    alert: {
      color: 'text-red-700',
      bg: 'bg-red-100',
      border: 'border-red-500',
      icon: <FaTimesCircle className="text-red-500 mr-2" />,
    },
  };

  const { color, bg, border, icon } = styles[type] || styles.info;

  return (
    <div
      className={`flex items-start ${bg} ${color} ${border} p-4 border-l-4 rounded shadow-sm mb-4`}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-3">{children}</div>
    </div>
  );
};

const PostContent = ({ title, content, thumbnail, created_at, tags }) => {
  const processedContent = preprocessContent(content);

  return (
    <div className="container mx-auto px-4 py-8">
      {thumbnail && (
        <div
          className="relative w-full h-72 bg-cover bg-center rounded-lg shadow-lg"
          style={{ backgroundImage: `url(${thumbnail})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 rounded-lg">
            <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
            <div className="flex items-center justify-between text-gray-300 text-sm">
              <span>{new Date(created_at).toLocaleDateString()}</span>
              <div className="flex gap-2">
                {tags &&
                  tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="prose max-w-none mt-8">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            // コードブロックのカスタマイズ
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
            // ノートブロックのカスタマイズ
            div({ node, className, children, ...props }) {
              if (className === 'note') {
                const type = node.properties?.dataType || node.properties?.type || 'info';
                return <Note type={type}>{children}</Note>;
              }
              return <div {...props}>{children}</div>;
            },
            // リンクのカスタマイズ（OGPCard を使用）
            a({ href }) {
              return (
                <div className="my-4">
                  <OGPCard url={href} />
                </div>
              );
            },
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PostContent;
