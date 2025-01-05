import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import OGPCard from './OGPCard';
import Note from './Note';
import '../styles/markdown.css'; // markdown.css をインポート

const preprocessContent = (content) => {
  return content.replace(
    /:::(note) (\w+)\n([\s\S]*?)\n:::/g,
    (_, blockType, type, text) => {
      return `<div class="note" data-type="${type}">${text}</div>`;
    }
  );
};

const PostContent = ({ content }) => {
  const processedContent = preprocessContent(content);

  return (
    <div className="markdown mt-8">
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
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default PostContent;
