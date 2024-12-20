import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import Script from 'next/script';
import { Tweet } from '@/components/Tweet';
import { OGPCard } from '@/components/OGPCard';
import preprocessMarkdown from '@/lib/preprocessMarkdown';
import Image from 'next/image';
import 'highlight.js/styles/github-dark-dimmed.css';

interface Article {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  created_at: string;
}

interface Props {
  article: Article;
}

const ArticlePage = ({ article }: Props) => {
  const router = useRouter();

  const renderContent = (content: string) => {
    const imageRegex = /!\[([^\]]*)\]\((http[^\)]+)\)/g; // 画像
    const tweetRegex = /https:\/\/x\.com\/\w+\/status\/(\d+)/g; // Xリンク
    const urlRegex = /(https?:\/\/[^\s]+)/g; // その他のURL

    const parts = [];
    let lastIndex = 0;

    // 画像を優先して処理
    content.replace(imageRegex, (match, altText, url, offset) => {
      if (lastIndex < offset) {
        parts.push(content.slice(lastIndex, offset));
      }
      parts.push(
        <img
          key={url}
          src={url}
          alt={altText || 'Image'}
          className="rounded my-4 max-w-full"
        />
      );
      lastIndex = offset + match.length;
      return match;
    });

    // 残り部分を次にXリンクとOGP用に処理
    const remainingContent = content.slice(lastIndex);
    let remainingIndex = 0;

    remainingContent.replace(urlRegex, (match, url, offset) => {
      const isTweet = tweetRegex.test(url);

      if (remainingIndex < offset) {
        parts.push(remainingContent.slice(remainingIndex, offset));
      }

      if (isTweet) {
        const tweetId = url.match(tweetRegex)?.[1];
        if (tweetId) {
          parts.push(<Tweet key={tweetId} id={tweetId} />);
        }
      } else {
        parts.push(<OGPCard key={url} url={url} />);
      }

      remainingIndex = offset + match.length;
      return match;
    });

    // 最後の部分を追加
    parts.push(remainingContent.slice(remainingIndex));

    // パーツをレンダリング
    return parts.map((part, index) =>
      typeof part === 'string' ? (
        <ReactMarkdown
          key={index}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
          {part}
        </ReactMarkdown>
      ) : (
        part
      )
    );
  };

  if (!article) {
    return <p className="text-center text-gray-500">記事が見つかりませんでした。</p>;
  }

  return (
    <div className="container p-4">
      <button
        onClick={() => router.back()}
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        戻る
      </button>
      <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

      {/* サムネイル表示 */}
      {article.thumbnail && (
        <div className="mb-6">
          <Image
            src={article.thumbnail}
            alt={article.title}
            width={800}
            height={600}
            className="rounded w-full h-auto"
          />
        </div>
      )}

      <div className="prose prose-blue bg-white p-6 rounded shadow">
        {renderContent(article.content)}
      </div>
      <p className="text-gray-500 mt-6">作成日: {article.created_at}</p>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.twttr) {
            window.twttr.widgets.load();
          }
        }}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`http://127.0.0.1:8080/api/articles/${id}`);
  const article = await res.json();

  // Markdownを前処理して修正
  article.content = preprocessMarkdown(article.content);

  return { props: { article } };
};

export default ArticlePage;
