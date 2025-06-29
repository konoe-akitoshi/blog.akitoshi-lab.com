import PostList from '../../components/PostList';
import { supabase } from '../../lib/supabase';

export async function getServerSideProps(context) {
  const { tag } = context.params;
  
  // Fetch all non-draft posts first
  const { data: allPosts, error } = await supabase
    .from('posts')
    .select('id, title, tags, thumbnail, created_at')
    .eq('draft', false);

  if (error) {
    console.error(error.message);
    return { props: { posts: [], tag } };
  }

  // Filter posts client-side to find those containing the tag
  const filteredPosts = (allPosts || []).filter(post => 
    post.tags && Array.isArray(post.tags) && post.tags.includes(tag)
  );

  return {
    props: {
      posts: filteredPosts,
      tag,
    },
  };
}

const TagPage = ({ posts, tag }) => {
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
