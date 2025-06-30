import Link from 'next/link';
import Image from 'next/image';
import { FiClock } from 'react-icons/fi';
import TagList from './TagList';
import Card from './Card';

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-600">No posts available.</p>;
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Card
          key={post.id}
          hover={true}
          className="overflow-hidden"
        >
          <article className="flex flex-col md:flex-row">
            {/* サムネイル */}
            <Link href={`/posts/${post.id}`} className="block w-full md:w-1/3 flex-shrink-0">
              {post.thumbnail && (
                <div className="relative w-full aspect-[16/10] md:aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt="thumbnail"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    fill
                  />
                </div>
              )}
            </Link>

            {/* 記事情報 */}
            <div className="flex-grow p-6">
              <Link href={`/posts/${post.id}`}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h2>
              </Link>
              <div className="flex items-center text-gray-500 text-sm mt-3 mb-4">
                <FiClock className="mr-2 flex-shrink-0" />
                {new Date(post.created_at).toLocaleDateString('ja-JP')}
              </div>
              <TagList tags={post.tags} />
            </div>
          </article>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
