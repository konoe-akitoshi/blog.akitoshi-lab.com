import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import { Switch } from '@headlessui/react';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState(''); // カンマ区切りで管理
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
          setTags(Array.isArray(data.tags) ? data.tags.join(', ') : '');
          setIsDraft(data.draft);
        }
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleImageUpload = async (file, insertIntoContent = false) => {
    // まだ記事IDがない場合の対処(新規作成時でIDが決まっていないケース)
    if (!id) {
      alert('まずは記事を保存して ID を発行してください。');
      return;
    }
  
    const uniqueId = uuidv4().split('-')[0];
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const fileExtension = file.name.split('.').pop();
  
    // 記事ごとにフォルダを分けるため、"content-images/${id}/" を追加
    const folderPath = `posts/${id}`;
    const newFileName = `${folderPath}/${uniqueId}-${date}.${fileExtension}`;
  
    const { data, error } = await supabase.storage
      .from('images')
      .upload(newFileName, file);
  
    if (error) {
      console.error('Upload error:', error.message);
    } else {
      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
  
      if (insertIntoContent) {
        setContent((prevContent) => `${prevContent}\n\n![Image](${publicUrl})\n\n`);
      } else {
        setThumbnail(publicUrl);
      }
    }
  };
  
  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      await handleImageUpload(file, true);
    }
  };

  const handleSave = async () => {
    const postData = {
      title,
      content,
      draft: isDraft,
      thumbnail,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    if (id) {
      const { error } = await supabase.from('posts').update(postData).eq('id', id);
      if (error) {
        console.error('Error updating post:', error.message);
      } else {
        alert('Post updated successfully');
        router.push('/admin');
      }
    } else {
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Post' : 'Create New Post'}</h1>

      {/* サムネイル */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Thumbnail</label>
        <input
          type="file"
          onChange={(e) => handleImageUpload(e.target.files[0])}
          className="mb-2"
        />
        {thumbnail && <img src={thumbnail} alt="Thumbnail" className="max-w-xs rounded shadow" />}
      </div>

      {/* タイトル入力 */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* タグ */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          placeholder="e.g. tech, programming, javascript"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* 本文入力 */}
      <textarea
        placeholder="Write your content in Markdown..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        className="w-full h-40 p-2 border rounded mb-4"
      />

      {/* ドラフトスイッチ */}
      <Switch.Group>
        <Switch
          checked={isDraft}
          onChange={setIsDraft}
          className={`${
            isDraft ? 'bg-blue-500' : 'bg-gray-300'
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
        >
          <span
            className={`${
              isDraft ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
        <Switch.Label className="ml-3">{isDraft ? 'Draft' : 'Published'}</Switch.Label>
      </Switch.Group>

      {/* 保存ボタン */}
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Save
      </button>

      {/* プレビュー */}
      <h2 className="text-xl font-semibold mt-6 mb-4">Preview</h2>
      <div className="p-4 border rounded bg-gray-50">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default EditPost;
