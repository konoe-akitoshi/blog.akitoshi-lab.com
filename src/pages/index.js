import Link from 'next/link';
import { supabase } from '../lib/supabase';

export async function getStaticProps() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, tags, thumbnail, created_at')
    .eq('draft', false) // 公開状態の記事のみ取得
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message);
    return { props: { posts: [] } };
  }

  return {
    props: {
      posts: posts || [],
    },
    revalidate: 10, // ISR用
  };
}

const Home = ({ posts }) => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts available.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block group bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex items-center"
            >
              {/* サムネイル部分 */}
              {post.thumbnail && (
                <div className="w-40 h-24 bg-gray-200 flex-shrink-0">
                  <img
                    src={post.thumbnail}
                    alt={`${post.title} Thumbnail`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {/* テキスト部分 */}
              <div className="p-4 flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
                {Array.isArray(post.tags) && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
