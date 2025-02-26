import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '../../../lib/supabase';
import Thumbnail from '../../../components/Thumbnail';
import PostContent from '../../../components/PostContent';
import dynamic from 'next/dynamic';

// Dynamically import TableOfContents and MobileTOCButton to prevent SSR
const TableOfContents = dynamic(() => import('../../../components/TOC'), { ssr: false });
const MobileTOCButton = dynamic(() => import('../../../components/MobileTOCButton'), { ssr: false });

// 動的メタデータの生成
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  // 投稿データの取得
  const { data: post } = await supabase
    .from('posts')
    .select('title, content, thumbnail')
    .eq('id', id)
    .single();

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
      images: [post.thumbnail],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.thumbnail],
    },
  };
}

async function getPost(id: string) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    console.error('Error fetching post:', error?.message);
    return null;
  }

  return post;
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    return <p>記事が見つかりませんでした。</p>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Thumbnail */}
        <div className="mb-8">
          <Thumbnail
            title={post.title}
            thumbnail={post.thumbnail}
            created_at={post.created_at}
            tags={post.tags}
          />
        </div>

        {/* Main content and desktop TOC */}
        <div className="flex gap-8">
          <div className="w-full md:w-3/4 content">
            <PostContent content={post.content} />
          </div>
          <div className="hidden md:block md:w-1/4">
            <div className="sticky top-8">
              <TableOfContents
                tocSelector=".toc-desktop"
                contentSelector=".content"
                headingSelector="h1, h2, h3, h4"
                collapseDepth={4}
              />
            </div>
          </div>
        </div>
      </div>

      <MobileTOCButton
        tocSelector=".toc-mobile"
        contentSelector=".content"
        headingSelector="h1, h2, h3, h4"
        collapseDepth={4}
      />
    </>
  );
}
