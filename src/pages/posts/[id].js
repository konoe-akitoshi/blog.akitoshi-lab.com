import { supabase } from '../../lib/supabase';

export async function getServerSideProps(context) {
  const { id } = context.params;

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error.message);
    return { notFound: true }; // 記事が見つからない場合、404 ページを表示
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
      <div>
        {post.thumbnail && <img src={post.thumbnail} alt="Thumbnail" style={{ maxWidth: '400px' }} />}
      </div>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
