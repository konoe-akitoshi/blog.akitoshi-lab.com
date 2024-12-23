import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../lib/supabase';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState(''); // タグをカンマ区切りで管理
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching post:', error.message);
        } else {
          setTitle(data.title);
          setContent(data.content);
          setThumbnail(data.thumbnail);
          setTags(Array.isArray(data.tags) ? data.tags.join(', ') : ''); // 配列をカンマ区切りに変換
        }
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleSave = async (isDraft) => {
    const postData = {
      title,
      content,
      draft: isDraft,
      thumbnail,
      tags: tags.split(',').map((tag) => tag.trim()), // カンマ区切りを配列に変換
    };

    if (id) {
      // 既存記事の更新
      const { error } = await supabase.from('posts').update(postData).eq('id', id);
      if (error) {
        console.error('Error updating post:', error.message);
      } else {
        alert(isDraft ? 'Post saved as draft' : 'Post published');
        router.push('/admin');
      }
    } else {
      // 新規作成
      const { error } = await supabase.from('posts').insert(postData);
      if (error) {
        console.error('Error creating post:', error.message);
      } else {
        alert(isDraft ? 'Post saved as draft' : 'Post published');
        router.push('/admin');
      }
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Post' : 'Create New Post'}</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: '100%', height: '200px' }}
      />
      <div>
        <label>Tags (comma separated)</label>
        <input
          type="text"
          placeholder="e.g. tech, programming, javascript"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div>
        <label>Thumbnail</label>
        <input
          type="file"
          onChange={(e) => {
            // Thumbnail upload logic here
          }}
        />
        {thumbnail && <img src={thumbnail} alt="Thumbnail" style={{ maxWidth: '200px' }} />}
      </div>
      <div>
        <button onClick={() => handleSave(true)} style={{ marginRight: '10px' }}>
          Save as Draft
        </button>
        <button onClick={() => handleSave(false)}>Publish</button>
      </div>
    </div>
  );
};

export default EditPost;
