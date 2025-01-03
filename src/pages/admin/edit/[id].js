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
  const [showPreview, setShowPreview] = useState(false); // プレビューの表示状態
  const [uploading, setUploading] = useState(false); // アップロード中の状態
  const [cursorPosition, setCursorPosition] = useState(0); // カーソル位置
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
        }
      }
    };

    if (id) fetchPost();

    const isMobile = window.innerWidth <= 768;
    setShowPreview(!isMobile);
  }, [id]);

  const handleImageUpload = async (file) => {
    const uniqueId = uuidv4().split('-')[0];
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const fileExtension = file.name.split('.').pop();
    const folderPath = `posts/${id || 'new-post'}`;
    const newFileName = `${folderPath}/${uniqueId}-${date}.${fileExtension}`;
  
    setUploading(true);
  
    const placeholder = `![Image](Uploading...)`;
    const newCursorPosition = cursorPosition + placeholder.length;
  
    // 現在のカーソル位置にプレースホルダーを挿入
    setContent((prevContent) => {
      const beforeCursor = prevContent.slice(0, cursorPosition);
      const afterCursor = prevContent.slice(cursorPosition);
      return `${beforeCursor}${placeholder}${afterCursor}`;
    });
  
    // アップロード処理
    const { data, error } = await supabase.storage
      .from('images')
      .upload(newFileName, file);
  
    if (error) {
      console.error('Upload error:', error.message);
    } else {
      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;
  
      // プレースホルダーを画像URLに置き換え
      setContent((prevContent) =>
        prevContent.replace(placeholder, `![Image](${publicUrl})`)
      );
  
      // カーソル位置を新しいテキストの末尾に更新
      setCursorPosition(newCursorPosition);
    }
  
    setUploading(false);
  };
  
  const handlePaste = async (event) => {
    const items = event.clipboardData.items;
  
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          // Prevent the default behavior to avoid inserting file names or other text
          event.preventDefault();
          await handleImageUpload(file);
        }
      }
    }
  };
  

  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();
  
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      await handleImageUpload(file); // 既存の handleImageUpload 関数を再利用
      event.dataTransfer.clearData(); // ドラッグ中のデータをクリア
    }
  };

  const handleCursorChange = (event) => {
    setCursorPosition(event.target.selectionStart);
  };

  const handleSave = async (draft = true) => {
    const postData = {
      title,
      content,
      draft,
      thumbnail,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    if (id) {
      const { error } = await supabase.from('posts').update(postData).eq('id', id);
      if (error) {
        console.error('Error updating post:', error.message);
      } else {
        alert(draft ? 'Draft saved successfully' : 'Post published successfully');
        router.push('/admin');
      }
    } else {
      const { error } = await supabase.from('posts').insert(postData);
      if (error) {
        console.error('Error creating post:', error.message);
      } else {
        alert(draft ? 'Draft saved successfully' : 'Post published successfully');
        router.push('/admin');
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
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
            onPaste={handlePaste}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            onSelect={handleCursorChange}
            className="w-full h-40 p-2 border rounded mb-4"
          />

          {/* 保存ボタン */}
          <div className="flex gap-4">
            <button
              onClick={() => handleSave(true)}
              className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
              disabled={uploading} // アップロード中は無効化
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSave(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
              disabled={uploading} // アップロード中は無効化
            >
              Publish
            </button>
          </div>
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
