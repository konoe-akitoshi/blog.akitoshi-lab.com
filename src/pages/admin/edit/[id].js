import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [isDraft, setIsDraft] = useState(true);
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
          setIsDraft(data.draft);
        }
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleImageUpload = async (file, insertIntoContent = false) => {
    const uniqueId = uuidv4().split('-')[0];
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const fileExtension = file.name.split('.').pop();
    const newFileName = `${uniqueId}-${date}.${fileExtension}`;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(`thumbnails/${newFileName}`, file);

    if (error) {
      console.error('Upload error:', error.message);
    } else {
      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;

      if (insertIntoContent) {
        // 本文中に画像を挿入
        setContent((prevContent) => `${prevContent}\n\n![Image](${publicUrl})\n\n`);
      } else {
        // サムネイルとして設定
        setThumbnail(publicUrl);
      }
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      await handleImageUpload(file, true); // 本文に画像を挿入
    }
  };

  const handleSave = async () => {
    const postData = {
      title,
      content,
      draft: isDraft,
      thumbnail,
    };

    if (id) {
      // 更新処理
      const { error } = await supabase.from('posts').update(postData).eq('id', id);
      if (error) {
        console.error('Error updating post:', error.message);
      } else {
        alert('Post updated successfully');
        router.push('/admin');
      }
    } else {
      // 新規作成
      const { error } = await supabase.from('posts').insert(postData);
      if (error) {
        console.error('Error creating post:', error.message);
      } else {
        alert('Post created successfully');
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
        placeholder="Write your content in Markdown..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: '100%', height: '200px' }}
        onDrop={handleDrop} // ドラッグ＆ドロップイベント
        onDragOver={(event) => event.preventDefault()} // ドラッグオーバーイベント
      />
      <div>
        <label>Thumbnail</label>
        <input
          type="file"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        />
        {thumbnail && <img src={thumbnail} alt="Thumbnail" style={{ maxWidth: '200px' }} />}
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isDraft}
            onChange={() => setIsDraft(!isDraft)}
          />
          Save as Draft
        </label>
      </div>
      <button onClick={handleSave}>Save</button>
      <h2>Preview</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default EditPost;
