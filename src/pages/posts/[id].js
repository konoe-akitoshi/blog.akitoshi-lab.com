import { supabase } from '../../lib/supabase';

export async function getStaticPaths() {
  const { data: posts, error } = await supabase.from('posts').select('id');

  if (error) {
    console.error('Error fetching paths:', error.message);
    return { paths: [], fallback: 'blocking' };
  }

  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: 'blocking', // 必要に応じて動的に生成
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

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
    props: { post },
    revalidate: 10, // ISRを使用
  };
}

const Post = ({ post }) => {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-auto rounded-md shadow-sm"
        />
      )}
      <div className="mt-4">{post.content}</div>
    </div>
  );
};

export default Post;
