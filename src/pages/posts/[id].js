// src/pages/posts/[id].js
import Head from 'next/head';
import { supabase } from '../../lib/supabase';
import Thumbnail from '../../components/Thumbnail';
import ContentBody from '../../components/PostContent';
import dynamic from 'next/dynamic';

// Dynamically import TableOfContents and MobileTOCButton to prevent SSR
const TableOfContents = dynamic(() => import('../../components/TOC'), { ssr: false });
const MobileTOCButton = dynamic(() => import('../../components/MobileTOCButton'), { ssr: false });

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

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.content.slice(0, 160)} />
        <meta name="twitter:image" content={post.thumbnail} />

        {/* Add async script for Zenn embedding */}
        <script
          async
          src="https://embed.zenn.studio/js/listen-embed-event.js"
        ></script>
      </Head>

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
            <ContentBody content={post.content} />
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
};

export default PostDetail;
