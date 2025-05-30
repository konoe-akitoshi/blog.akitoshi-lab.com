import { Metadata } from 'next';
import PostList from '../components/PostList';
import { postOperations } from '../db/utils';

export const metadata: Metadata = {
  title: 'ブログ | Akitoshi Lab.',
  description: 'Akitoshi Labのブログ記事一覧',
};

export const revalidate = 10; // ISRの設定

async function getPosts() {
  try {
    const posts = await postOperations.getAllPublished();
    
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      tags: post.tags || [],
      thumbnail: post.thumbnail || undefined,
      created_at: post.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
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
