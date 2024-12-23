import Link from 'next/link';
import { supabase } from '../lib/supabase';

export async function getStaticProps() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, content, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message);
    return { props: { posts: [] } };
  }

  return {
    props: {
      posts: posts || [],
    },
    revalidate: 10,
  };
}

const Home = ({ posts }) => {
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: '20px' }}>
            <h2>
              <Link href={`/posts/${post.id}`}>
                {post.title}
              </Link>
            </h2>
            <p>{post.content.slice(0, 100)}...</p>
            <p>Created at: {new Date(post.created_at).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
