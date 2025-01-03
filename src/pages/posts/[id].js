import Head from 'next/head';
import Thumbnail from '../../components/Thumbnail';
import TableOfContents from '../../components/TOC';
import ContentBody from '../../components/PostContent';
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

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.content.slice(0, 160)} />
        <meta name="twitter:image" content={post.thumbnail} />
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
        {/* 本文とTOC */}
        <div className="flex gap-8">
          <div className="w-3/4">
            <ContentBody content={post.content} />
          </div>
          <TableOfContents />
        </div>
      </div>
    </>
  );
};

export default PostDetail;
