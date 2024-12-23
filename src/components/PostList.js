import Link from 'next/link';
import { FiClock } from 'react-icons/fi';
import TagList from './TagList';

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-600">No posts available.</p>;
  }

  return (
    <div className="space-y-12">
      {posts.map((post) => (
        <article key={post.id} className="flex items-start space-x-6">
          <Link href={`/posts/${post.id}`} className="block flex-shrink-0">
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt="thumbnail"
                className="w-80 h-40 object-cover rounded-md shadow-sm"
              />
            )}
          </Link>
          <div className="flex-grow">
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-2xl font-bold text-gray-800 hover:opacity-75 transition-opacity">
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
