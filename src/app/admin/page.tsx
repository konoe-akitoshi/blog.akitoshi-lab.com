'use client';

import { useRouter } from 'next/navigation';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { HiDotsVertical, HiTrash, HiPencilAlt, HiPlus } from 'react-icons/hi';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { clientStorageOperations } from '../../lib/client-storage';

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 投稿データの取得
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await fetch('/api/admin/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const handleDelete = async () => {
    if (!selectedPost?.id) return;

    try {
      // 写真フォルダ削除処理
      const folderPath = `posts/${selectedPost.id}`;
      await clientStorageOperations.deleteFolder(folderPath);

      // 記事削除処理（APIエンドポイント経由）
      const response = await fetch(`/api/admin/posts/${selectedPost.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      alert('Post deleted successfully');
      // 投稿リストを更新
      setPosts(posts.filter(post => post.id !== selectedPost.id));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
    
    setIsDialogOpen(false);
  };

  // ローディング中
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
        <button
          onClick={() => router.push('/admin/create')}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          <HiPlus className="mr-2" />
          New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600 text-center">No posts available.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`p-4 bg-white rounded-lg shadow-md flex items-start space-x-4 ${
                post.draft ? 'opacity-75 border-l-4 border-yellow-400' : ''
              }`}
            >
              {/* サムネイル */}
              {post.thumbnail && (
                <div className="w-32 h-20 bg-gray-200 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt="thumbnail"
                    width={128}
                    height={80}
                    className="rounded-md"
                  />
                </div>
              )}

              {/* コンテンツ */}
              <div className="flex-grow">
                <h2 className="text-lg font-semibold text-gray-800">
                  {post.title}
                  {post.draft && (
                    <span className="ml-2 text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                      Draft
                    </span>
                  )}
                </h2>
                <div className="text-sm text-gray-500 mt-1">
                  Created: {new Date(post.created_at).toLocaleDateString()}
                  <br />
                  Updated: {new Date(post.updated_at).toLocaleDateString()}
                </div>
                {/* タグ */}
                {Array.isArray(post.tags) && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* メニュー */}
              <Menu as="div" className="relative">
                <Menu.Button className="text-gray-500 hover:text-gray-700">
                  <HiDotsVertical className="w-6 h-6" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => router.push(`/admin/edit/${post.id}`)}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                        >
                          <HiPencilAlt className="mr-2 w-5 h-5" />
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            setSelectedPost(post);
                            setIsDialogOpen(true);
                          }}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex items-center w-full px-4 py-2 text-sm text-red-600`}
                        >
                          <HiTrash className="mr-2 w-5 h-5" />
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ))}
        </div>
      )}

      {/* 削除確認モーダル */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="relative z-50"
      >
        <Transition
          show={isDialogOpen}
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition>
        <div className="fixed inset-0 flex items-center justify-center">
          <Transition
            show={isDialogOpen}
            as={Fragment}
            enter="transition-transform duration-300"
            enterFrom="translate-y-4 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-transform duration-300"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-4 opacity-0"
          >
            <Dialog.Panel className="bg-white p-6 rounded shadow-lg">
              <Dialog.Title className="text-lg font-semibold">
                Confirm Deletion
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-600 mt-2">
                Are you sure you want to delete &quot;{selectedPost?.title}&quot;? This action
                cannot be undone.
              </Dialog.Description>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </Dialog.Panel>
          </Transition>
        </div>
      </Dialog>
    </div>
  );
}
