import { Metadata } from 'next';
import PostList from '../components/PostList';
import { supabase } from '../lib/supabase';

export const metadata: Metadata = {
  title: 'ブログ | Akitoshi Lab.',
  description: 'Akitoshi Labのブログ記事一覧',
};

export const revalidate = 10; // ISRの設定

async function getPosts() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, tags, thumbnail, created_at')
    .eq('draft', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message);
    return [];
  }

  return posts.map((post) => ({
    ...post,
    tags: post.tags || [],
  }));
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen py-8">
      <main className="container mx-auto px-4">
        <PostList posts={posts} />
      </main>
    </div>
  );
}
