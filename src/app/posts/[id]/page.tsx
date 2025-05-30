import { Metadata, ResolvingMetadata } from 'next';
import { postOperations } from '../../../db/utils';
import Thumbnail from '../../../components/Thumbnail';
import PostContent from '../../../components/PostContent';
import ClientTOC from '../../../components/ClientTOC';

// 動的メタデータの生成
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // paramsオブジェクト全体をawaitする
  params = await params;
  const id = params.id;

  // 投稿データの取得
  const post = await postOperations.getById(id);

  if (!post) {
    return {
      title: 'Not Found | Akitoshi Lab.',
      description: '記事が見つかりませんでした。',
    };
  }

  const description = post.content.slice(0, 160);

  return {
    title: `${post.title} | Akitoshi Lab.`,
    description,
    openGraph: {
      title: post.title,
      description,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

async function getPost(id: string) {
  try {
    const post = await postOperations.getById(id);
    return post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  // paramsオブジェクト全体をawaitする
  params = await params;
  const id = params.id;
  const post = await getPost(id);

  if (!post) {
    return <p>記事が見つかりませんでした。</p>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="mb-8">
            <Thumbnail
              title={post.title}
              thumbnail={post.thumbnail}
              created_at={post.createdAt.toISOString()}
              tags={post.tags}
            />
          </div>
        )}

        {/* Main content and TOC */}
        <ClientTOC>
          <PostContent content={post.content} />
        </ClientTOC>
      </div>
    </>
  );
}
