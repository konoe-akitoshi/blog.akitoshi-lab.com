'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setTitle(data.title || '');
          setContent(data.content || '');
          setThumbnail(data.thumbnail || '');
          setTags(Array.isArray(data.tags) ? data.tags.join(', ') : '');
          setIsDraft(data.draft || false);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('投稿の取得に失敗しました。');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const now = new Date().toISOString();
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);

      const { error } = await supabase
        .from('posts')
        .update({
          title,
          content,
          thumbnail,
          tags: tagsArray,
          updated_at: now,
          draft: isDraft,
        })
        .eq('id', params.id);

      if (error) {
        throw error;
      }

      // 投稿更新成功
      router.push('/admin');
    } catch (err) {
      console.error('Error updating post:', err);
      setError('投稿の更新に失敗しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">投稿の編集</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
            サムネイルURL
          </label>
          <input
            type="url"
            id="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            タグ（カンマ区切り）
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="tag1, tag2, tag3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            本文（Markdown）
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="draft"
            checked={isDraft}
            onChange={(e) => setIsDraft(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="draft" className="ml-2 block text-sm text-gray-900">
            下書きとして保存
          </label>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? '保存中...' : '保存'}
          </button>
        </div>
      </form>
    </div>
  );
}
