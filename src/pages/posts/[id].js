import { supabase } from '../../lib/supabase';
import ReactMarkdown from 'react-markdown';

export async function getServerSideProps(context) {
  const { id } = context.params;

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error.message);
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
}

const PostDetail = ({ post }) => {
  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>Created at: {new Date(post.created_at).toLocaleDateString()}</p>
      {post.thumbnail && (
        <div>
          <img src={post.thumbnail} alt="Thumbnail" style={{ maxWidth: '400px' }} />
        </div>
      )}
      <ReactMarkdown>{post.content}</ReactMarkdown>
      {post.tags && (
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
  );
};

export default PostDetail;
