import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';

export async function getServerSideProps() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message);
    return { props: { posts: [] } };
  }

  return {
    props: {
      posts: posts || [],
    },
  };
}

const Admin = ({ posts }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) {
      console.error('Error deleting post:', error.message);
    } else {
      alert('Post deleted successfully');
      router.reload(); // ページをリロード
    }
  };

  return (
    <div>
      <h1>Content Management</h1>
      <button onClick={() => router.push('/admin/create')}>New Post</button>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: '20px' }}>
            <h2>{post.title}</h2>
            <p>Created at: {new Date(post.created_at).toLocaleDateString()}</p>
            <button onClick={() => router.push(`/admin/edit/${post.id}`)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;
