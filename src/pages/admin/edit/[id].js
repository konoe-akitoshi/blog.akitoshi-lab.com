import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import PostContent from '../../../components/PostContent';
import { Switch } from '@headlessui/react';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState(''); // カンマ区切りで管理
  const [isDraft, setIsDraft] = useState(true);
  const [showPreview, setShowPreview] = useState(false); // プレビューの表示状態
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

    // スマホ画面ではデフォルトでプレビューを非表示
    const isMobile = window.innerWidth <= 768;
    setShowPreview(!isMobile);
  }, [id]);

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
    <div className="p-6 max-w-6xl mx-auto">
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{id ? 'Edit Post' : 'Create New Post'}</h1>

        {/* プレビュー表示切り替えスイッチ */}
        <Switch.Group>
          <div className="flex items-center">
            <Switch
              checked={showPreview}
              onChange={setShowPreview}
              className={`${
                showPreview ? 'bg-blue-500' : 'bg-gray-300'
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
            >
              <span
                className={`${
                  showPreview ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </Switch>
            <Switch.Label className="ml-3">
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Switch.Label>
          </div>
        </Switch.Group>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 編集フォーム */}
        <div className="flex-1">
          {/* サムネイル */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Thumbnail</label>
            <input
              type="file"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              className="mb-2"
            />
            {thumbnail && (
              <img src={thumbnail} alt="Thumbnail" className="max-w-xs rounded shadow" />
            )}
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
            className="w-full h-40 p-2 border rounded mb-4"
          />

          {/* ドラフト切り替え */}
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
            <Switch.Label className="ml-3">
              {isDraft ? 'Draft' : 'Published'}
            </Switch.Label>
          </Switch.Group>

          {/* 保存ボタン */}
          <button
            onClick={handleSave}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Save
          </button>
        </div>

        {/* プレビュー */}
        {showPreview && (
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="p-4 border rounded bg-gray-50">
              <PostContent
                title={title}
                content={content}
                thumbnail={thumbnail}
                created_at={new Date()} // プレビューなので現在日時を利用
                tags={tags.split(',').map((tag) => tag.trim())}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPost;
