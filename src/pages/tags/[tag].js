import { useRouter } from 'next/router';
import TagList from '../../components/TagList';
import PostList from '../../components/PostList';
import { supabase } from '../../lib/supabase';

export async function getServerSideProps(context) {
  const { tag } = context.params;
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, tags, thumbnail, created_at')
    .eq('draft', false)
    .contains('tags', [tag]);

  if (error) {
    console.error(error.message);
    return { props: { posts: [], tag } };
  }

  return {
    props: {
      posts: posts || [],
      tag,
    },
  };
}

const TagPage = ({ posts, tag }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tag: #{tag}</h1>
      <PostList posts={posts} />
      {posts.length === 0 && <p>No posts found for this tag.</p>}
    </div>
  );
};

export default TagPage;
