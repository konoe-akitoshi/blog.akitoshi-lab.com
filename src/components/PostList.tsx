import React from 'react';
import Link from 'next/link';
import { FiClock } from 'react-icons/fi';
import TagList from './TagList';

interface Post {
  id: string;
  title: string;
  thumbnail?: string;
  created_at: string;
  tags?: string[];
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-600">No posts available.</p>;
  }

  return (
    <div className="space-y-12">
      {posts.map((post) => (
        <article
          key={post.id}
          className="flex flex-col md:flex-row items-start md:space-x-6"
        >
          {/* サムネイル */}
          <Link href={`/posts/${post.id}`} className="block w-full md:w-1/3 flex-shrink-0">
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt="thumbnail"
                className="w-full h-48 md:h-40 object-cover rounded-md shadow-sm"
              />
            )}
          </Link>

          {/* 記事情報 */}
          <div className="flex-grow mt-4 md:mt-0">
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 hover:opacity-75 transition-opacity">
                {post.title}
              </h2>
            </Link>
            <div className="flex items-center text-gray-600 text-sm mt-2">
              <FiClock className="mr-2" />
              {new Date(post.created_at).toLocaleDateString()}
            </div>
            <TagList tags={post.tags} />
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostList;
