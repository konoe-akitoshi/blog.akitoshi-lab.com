import Link from 'next/link';
import Image from 'next/image';
import { FiClock } from 'react-icons/fi';

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-600">No posts available.</p>;
  }

  return (
    <div className="space-y-16">
      {posts.map((post) => (
        <article key={post.id} className="group flex flex-col md:flex-row md:items-center md:space-x-12">
          {/* サムネイル */}
          {post.thumbnail && (
            <Link href={`/posts/${post.id}`} className="block mb-6 md:mb-0 md:w-2/5 md:flex-shrink-0">
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
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
          <div className="md:w-3/5 md:mt-2">
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-gray-600 transition-colors leading-tight mt-0">
                {post.title}
              </h2>
            </Link>
            
            <div className="flex items-center text-gray-500 text-sm mb-4">
              <FiClock className="mr-2" />
              {new Date(post.created_at).toLocaleDateString('ja-JP')}
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <Link
                    key={index}
                    href={`/tags/${tag}`}
                    className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-gray-400">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostList;
