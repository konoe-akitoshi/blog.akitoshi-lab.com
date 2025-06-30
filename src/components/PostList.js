import Link from 'next/link';
import Image from 'next/image';
import { FiClock } from 'react-icons/fi';
import TagList from './TagList';

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-600">No posts available.</p>;
  }

  return (
    <div className="space-y-12">
      {posts.map((post) => (
        <article key={post.id} className="group flex flex-col md:flex-row md:items-center md:space-x-8">
          {/* サムネイル */}
          {post.thumbnail && (
            <Link href={`/posts/${post.id}`} className="block mb-4 md:mb-0 md:w-1/2 md:flex-shrink-0">
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt="thumbnail"
                  className="object-cover"
                  fill
                />
              </div>
            </Link>
          )}

          {/* 記事情報 */}
          <div className="md:w-1/2">
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <FiClock className="mr-2" />
              {new Date(post.created_at).toLocaleDateString('ja-JP')}
            </div>
            
            <TagList tags={post.tags} />
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostList;
