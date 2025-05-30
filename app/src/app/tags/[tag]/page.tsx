import { Metadata } from 'next';
import PostList from '../../../components/PostList';
import { postOperations } from '../../../db/utils';

// 動的メタデータの生成
export async function generateMetadata(
  { params }: { params: { tag: string } }
): Promise<Metadata> {
  // paramsオブジェクト全体をawaitする
  params = await params;
  const tag = params.tag;

  return {
    title: `#${tag} の記事 | Akitoshi Lab.`,
    description: `${tag}タグの記事一覧`,
  };
}

async function getPostsByTag(tag: string) {
  try {
    const posts = await postOperations.getByTag(tag);
    
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      tags: post.tags || [],
      thumbnail: post.thumbnail || undefined,
      created_at: post.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return [];
  }
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  // paramsオブジェクト全体をawaitする
  params = await params;
  const tag = params.tag;
  const posts = await getPostsByTag(tag);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tag: #{tag}</h1>
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="text-gray-600">No posts found for this tag.</p>
      )}
    </div>
  );
}
