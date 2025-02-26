'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import PostContent from '../../../../components/PostContent';
import Image from 'next/image';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [tags, setTags] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ドラッグ＆ドロップ関連の状態
  const [isDragging, setIsDragging] = useState(false);

  // 投稿データの取得
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
          setThumbnailPreview(data.thumbnail || null);
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

  // ファイル選択ハンドラー
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  // ドラッグ＆ドロップハンドラー
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  }, []);

  // ファイル処理共通関数
  const handleFileChange = (file: File) => {
    // 画像ファイルのみ許可
    if (!file.type.startsWith('image/')) {
      setError('画像ファイルのみアップロードできます。');
      return;
    }

    setThumbnailFile(file);
    
    // プレビュー用のURL生成
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // サムネイル画像のアップロード
  const uploadThumbnail = async (postId: string): Promise<string | null> => {
    if (!thumbnailFile) return thumbnail; // 既存のURLを使用

    const fileExt = thumbnailFile.name.split('.').pop();
    const fileName = `${postId}.${fileExt}`;
    const filePath = `posts/${postId}/${fileName}`;

    try {
      setUploadProgress(0);
      
      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, thumbnailFile, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // アップロード完了
      setUploadProgress(100);

      // 公開URLを取得
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error('Error uploading thumbnail:', err);
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const now = new Date().toISOString();
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);

      // サムネイル画像をアップロード
      let thumbnailUrl = thumbnail;
      if (thumbnailFile) {
        thumbnailUrl = await uploadThumbnail(params.id) || '';
      }

      const { error } = await supabase
        .from('posts')
        .update({
          title,
          content,
          thumbnail: thumbnailUrl,
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

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 編集フォーム */}
        <div className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                サムネイル画像
              </label>
              
              {/* ドラッグ＆ドロップエリア */}
              <div
                className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                  isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {thumbnailPreview ? (
                  <div className="relative h-40 w-full">
                    <Image
                      src={thumbnailPreview}
                      alt="サムネイルプレビュー"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="py-4">
                    <p className="text-gray-500">
                      画像をドラッグ＆ドロップするか、クリックして選択してください
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              
              {/* アップロード進捗バー */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-2">
                  <div className="bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{uploadProgress}% アップロード中...</p>
                </div>
              )}
              
              {/* 既存のURL入力フィールド */}
              <div className="mt-2">
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                  または画像URLを入力
                </label>
                <input
                  type="url"
                  id="thumbnail"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
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

        {/* プレビュー */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <div className="sticky top-8 border rounded-md p-4 bg-white shadow">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">プレビュー</h2>
            
            {/* タイトルプレビュー */}
            <h1 className="text-2xl font-bold mb-4">{title || 'タイトル'}</h1>
            
            {/* サムネイルプレビュー */}
            {(thumbnailPreview || thumbnail) && (
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={thumbnailPreview || thumbnail}
                  alt={title || 'サムネイル'}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
            
            {/* タグプレビュー */}
            {tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.split(',').map((tag, index) => (
                  tag.trim() && (
                    <span
                      key={index}
                      className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded"
                    >
                      #{tag.trim()}
                    </span>
                  )
                ))}
              </div>
            )}
            
            {/* 本文プレビュー */}
            <div className="prose max-w-none">
              {content ? (
                <PostContent content={content} />
              ) : (
                <p className="text-gray-400 italic">本文を入力するとプレビューが表示されます</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
