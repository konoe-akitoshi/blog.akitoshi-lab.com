import Head from 'next/head';
import PostList from '../components/PostList';
import PageContainer from '../components/PageContainer';
import { supabase } from '../lib/supabase';

export async function getStaticProps() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, tags, thumbnail, created_at')
    .eq('draft', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message);
    return { props: { posts: [] } };
  }

  const formattedPosts = posts.map((post) => ({
    ...post,
    tags: post.tags || [],
  }));

  return {
    props: {
      posts: formattedPosts,
    },
    revalidate: 10,
  };
}

const Home = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Akitoshi Lab Blog</title>
        <meta name="description" content="技術・デザイン・アイデアを発信するブログ" />
        <meta property="og:title" content="Akitoshi Lab Blog" />
        <meta property="og:url" content="https://blog.akitoshi-lab.com" />
      </Head>
      <div className="min-h-screen">
        <PageContainer maxWidth="sm" className="pt-10 pb-12">
          <PostList posts={posts} />
        </PageContainer>
      </div>
    </>
  );
};

export default Home;
