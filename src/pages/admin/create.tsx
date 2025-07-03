import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const CreatePost = () => {
  const router = useRouter();

  useEffect(() => {
    const createPost = async () => {
      const { data, error } = await supabase.from('posts').insert([
        {
          title: 'New Post', // 初期タイトル
          content: '', // 初期内容
          draft: true, // 下書き状態
          thumbnail: '', // 初期サムネイル
        },
      ]).select('id').single();

      if (error) {
        console.error('Error creating new post:', error.message);
      } else {
        // 新規作成後、記事の編集ページにリダイレクト
        router.push(`/admin/edit/${data.id}`);
      }
    };

    createPost();
  }, [router]);

  return <p>Redirecting to create a new post...</p>;
};

export default CreatePost;
