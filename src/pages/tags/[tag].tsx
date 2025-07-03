import PostList from '../../components/PostList';
import { supabase } from '../../lib/supabase';
import { GetServerSidePropsContext, Post } from '@/types';
import { GetServerSidePropsResult } from 'next';

interface TagPageProps {
  posts: Omit<Post, 'content'>[];
  tag: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TagPageProps>> {
  const { tag } = context.params || {};
  const tagString = Array.isArray(tag) ? tag[0] : tag || '';
  
  // Fetch all non-draft posts first
  const { data: allPosts, error } = await supabase
    .from('posts')
    .select('id, title, tags, thumbnail, created_at, updated_at')
    .eq('draft', false);

  if (error) {
    console.error(error.message);
    return { props: { posts: [], tag: tagString } };
  }

  // Filter posts client-side to find those containing the tag
  const filteredPosts = (allPosts || []).filter(post => 
    post.tags && Array.isArray(post.tags) && post.tags.includes(tagString)
  );

  return {
    props: {
      posts: filteredPosts,
      tag: tagString,
    },
  };
}

const TagPage = ({ posts, tag }: TagPageProps) => {
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
};

export default TagPage;
