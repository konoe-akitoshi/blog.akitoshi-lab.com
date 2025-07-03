import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { supabase } from '../../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import Thumbnail from '../../../components/Thumbnail';
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

  const handleThumbnailUpload = async (file) => {
    const uniqueId = uuidv4().split('-')[0];
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const fileExtension = file.name.split('.').pop();
    const folderPath = `thumbnails/${id || 'new-post'}`;
    const newFileName = `${folderPath}/${uniqueId}-${date}.${fileExtension}`;

    setUploading(true);

    const { data, error } = await supabase.storage
      .from('images')
      .upload(newFileName, file);

    if (error) {
      console.error('Thumbnail upload error:', error.message);
    } else {
      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;
      setThumbnail(publicUrl);
    }

    setUploading(false);
  };

  const handleImageUpload = async (file) => {
    const uniqueId = uuidv4().split('-')[0];
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const fileExtension = file.name.split('.').pop();
    const folderPath = `posts/${id || 'new-post'}`;
    const newFileName = `${folderPath}/${uniqueId}-${date}.${fileExtension}`;

    setUploading(true);

    const placeholder = `![Image](Uploading...)`;
    const newCursorPosition = cursorPosition + placeholder.length;

    setContent((prevContent) => {
      const beforeCursor = prevContent.slice(0, cursorPosition);
      const afterCursor = prevContent.slice(cursorPosition);
      return `${beforeCursor}${placeholder}${afterCursor}`;
    });

    const { data, error } = await supabase.storage
      .from('images')
      .upload(newFileName, file);

    if (error) {
      console.error('Upload error:', error.message);
    } else {
      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;

      setContent((prevContent) =>
        prevContent.replace(placeholder, `![Image](${publicUrl})`)
      );

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
      await handleImageUpload(file);
      event.dataTransfer.clearData();
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
      updated_at: new Date().toISOString(),
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

      <div className="flex flex-col lg:flex-row gap-6 min-h-0">
        <div className={`w-full ${showPreview ? 'lg:w-1/2' : ''} flex-shrink-0`}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Thumbnail</label>
            <div 
              className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                  handleThumbnailUpload(file);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onClick={() => document.getElementById('thumbnail-input').click()}
            >
              <input
                id="thumbnail-input"
                type="file"
                accept="image/*"
                onChange={(e) => handleThumbnailUpload(e.target.files[0])}
                className="hidden"
              />
              {thumbnail ? (
                <div className="space-y-2">
                  <div className="relative mx-auto max-h-48 max-w-xs rounded shadow overflow-hidden">
                    <Image
                      src={thumbnail}
                      alt="Thumbnail"
                      width={300}
                      height={192}
                      className="object-cover rounded shadow"
                    />
                  </div>
                  <p className="text-sm text-gray-500">Click or drag to change image</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <p className="text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

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

          <textarea
            ref={(textarea) => {
              if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = Math.max(160, textarea.scrollHeight) + 'px';
              }
            }}
            placeholder="Write your content in Markdown..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = Math.max(160, e.target.scrollHeight) + 'px';
            }}
            onPaste={handlePaste}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            onSelect={handleCursorChange}
            className="w-full p-2 border rounded mb-4 resize-none overflow-hidden"
          />

          <div className="flex gap-4">
            <button
              onClick={() => handleSave(true)}
              className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
              disabled={uploading}
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSave(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
              disabled={uploading}
            >
              Publish
            </button>
          </div>
        </div>

        {showPreview && (
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="p-4 border rounded bg-gray-50">
              <Thumbnail
                title={title}
                thumbnail={thumbnail}
                created_at={new Date()}
                tags={tags.split(',').map((tag) => tag.trim())}
              />
              <PostContent content={content} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPost;
