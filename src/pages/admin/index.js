import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { HiDotsVertical, HiTrash, HiPencilAlt, HiPlus } from 'react-icons/hi';
import Image from 'next/image';
import { requireAuth } from '../../lib/auth';
import PageContainer from '../../components/PageContainer';
import Button from '../../components/Button';
import Card from '../../components/Card';

export async function getServerSideProps(context) {
  const authResult = await requireAuth(context);

  if ('redirect' in authResult) {
    return authResult; // 認証されていない場合のリダイレクト処理
  }

  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, thumbnail, tags, created_at, updated_at, draft')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message);
    return { props: { posts: [] } };
  }

  return {
    props: {
      posts: posts || [],
    },
  };
}

const Admin = ({ posts }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleDelete = async () => {
    if (!selectedPost?.id) return;

    // 写真フォルダ削除処理
    const folderPath = `posts/${selectedPost.id}`;
    const { data: fileList, error: listError } = await supabase.storage
      .from('images')
      .list(folderPath, { limit: 100 });

    if (listError) {
      console.error('Error listing files for deletion:', listError.message);
    } else {
      const filesToDelete = fileList.map((file) => `${folderPath}/${file.name}`);
      const { error: deleteError } = await supabase.storage
        .from('images')
        .remove(filesToDelete);

      if (deleteError) {
        console.error('Error deleting images:', deleteError.message);
      } else {
        console.log('Images deleted successfully.');
      }
    }

    // 記事削除処理
    const { error } = await supabase.from('posts').delete().eq('id', selectedPost?.id);
    if (error) {
      console.error('Error deleting post:', error.message);
    } else {
      alert('Post deleted successfully');
      router.reload(); // ページをリロード
    }
    setIsDialogOpen(false);
  };

  return (
    <PageContainer maxWidth="lg" className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
        <Button
          onClick={() => router.push('/admin/create')}
          variant="primary"
          size="md"
          className="flex items-center"
        >
          <HiPlus className="mr-2" />
          New Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600 text-center">No posts available.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              variant={post.draft ? "outlined" : "default"}
              className={`${
                post.draft ? 'opacity-80 border-l-4 border-yellow-400' : ''
              }`}
            >
              <Card.Content className="flex items-center space-x-4 w-full p-6">
              {/* サムネイル */}
              {post.thumbnail && (
                <div className="w-24 aspect-[16/9] bg-gray-200 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt="thumbnail"
                    className="object-cover w-full h-full"
                    width={96}
                    height={54}
                  />
                </div>
              )}

              {/* コンテンツ */}
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-semibold text-gray-800 flex-grow">
                    {post.title}
                  </h2>
                  {post.draft && (
                    <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full font-medium">
                      下書き
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500 mt-2 mb-3">
                  {new Date(post.created_at).toLocaleDateString('ja-JP')} • 
                  更新: {new Date(post.updated_at).toLocaleDateString('ja-JP')}
                </div>
                {/* タグ */}
                {Array.isArray(post.tags) && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 4).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 4 && (
                      <span className="text-xs text-gray-400">
                        +{post.tags.length - 4}
                      </span>
                    )}
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
              </Card.Content>
            </Card>
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
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="danger"
                >
                  Delete
                </Button>
              </div>
            </Dialog.Panel>
          </Transition>
        </div>
      </Dialog>
    </PageContainer>
  );
};

export default Admin;
