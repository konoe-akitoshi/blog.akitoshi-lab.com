import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  id: number;
  title: string;
  thumbnail: string;
  created_at: string;
}

interface Props {
  articles: Article[];
}

const HomePage = ({ articles }: Props) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">記事一覧</h1>
      <div className="space-y-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 flex items-start">
              <div className="w-36 h-36 mr-6 flex-shrink-0">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  width={144}
                  height={144}
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h2>
                <p className="text-sm text-gray-500">投稿日: {article.created_at}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://127.0.0.1:8080/api/articles/list');
  const articles = await res.json();

  return { props: { articles } };
};

export default HomePage;
