import Head from 'next/head';
import PostContent from '../../components/PostContent';
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
    <>
      <Head>
        <title>{post.title} | Akitoshi Lab.</title>
        <meta name="description" content={post.content.slice(0, 160)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content.slice(0, 160)} />
        <meta property="og:image" content={post.thumbnail} />
      </Head>
      <PostContent
        title={post.title}
        content={post.content}
        thumbnail={post.thumbnail}
        created_at={post.created_at}
        tags={post.tags}
      />
    </>
  );
};

export default PostDetail;
