import PostList from '../components/PostList';
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
    <div className="min-h-screen">
      <main className="max-w-2xl mx-auto pt-10 pb-12 p-4">
        <PostList posts={posts} />
      </main>
    </div>
  );
};

export default Home;
