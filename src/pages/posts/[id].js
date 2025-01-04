// pages/posts/[id].js
import Head from 'next/head';
import { supabase } from '../../lib/supabase';
import Thumbnail from '../../components/Thumbnail';
import ContentBody from '../../components/PostContent';
import TableOfContents from '../../components/TOC';

export async function getServerSideProps(context) {
  const { id } = context.params;

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    console.error('Error fetching post:', error?.message);
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
        {/* 他のOGPやTwitterカードのメタタグも適宜 */}
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* サムネイル */}
        <div className="mb-8">
          <Thumbnail
            title={post.title}
            thumbnail={post.thumbnail}
            created_at={post.created_at}
            tags={post.tags}
          />
        </div>

        {/* 本文＋TOC */}
        <div className="flex gap-8">
          {/* 本文部分。className="content" を付与して tocbot が見出しを検出できるように */}
          <div className="w-full md:w-3/4 content">
            <ContentBody content={post.content} />
          </div>

          {/* デスクトップ向けサイドバーTOC (md以上で表示) */}
          <div className="hidden md:block md:w-1/4">
            <div className="sticky top-8">
              <TableOfContents
                tocSelector=".toc, .mobile-toc" // デスクトップとモバイル両方を指定
                contentSelector=".content"
                headingSelector="h1, h2, h3, h4" // 必要に応じて変更
                collapseDepth={4} // 必要に応じて変更
                // その他のtocbot設定を追加可能
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
