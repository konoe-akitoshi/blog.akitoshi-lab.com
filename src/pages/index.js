import Link from 'next/link';
import { supabase } from '../lib/supabase';

export async function getStaticProps() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, tags, thumbnail, created_at')
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
    <div>
      <h1>Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            {post.thumbnail && (
              <div style={{ marginRight: '15px' }}>
                <img
                  src={post.thumbnail}
                  alt={`${post.title} Thumbnail`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                />
              </div>
            )}
            <div>
              <h2>
                <Link href={`/posts/${post.id}`}>
                  {post.title}
                </Link>
              </h2>
              <p>Created at: {new Date(post.created_at).toLocaleDateString()}</p>
              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <div>
                  <strong>Tags:</strong>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {post.tags.map((tag, index) => (
                      <li key={index} style={{ display: 'inline', marginRight: '10px' }}>
                        #{tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
