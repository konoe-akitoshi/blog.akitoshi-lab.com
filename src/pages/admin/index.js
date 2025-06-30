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
      <div className="flex justify-between items-center mb-8">
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
        <div className="text-center py-12">
          <p className="text-gray-600">No posts available.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              variant={post.draft ? "outlined" : "default"}
              className={`${
                post.draft ? 'opacity-80 border-l-4 border-yellow-400' : ''
              }`}
            >
              <Card.Content className="p-6">
                {/* Mobile-First: 縦並び、タブレット以上で横並び */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* サムネイル - Mobile: 100%, Tablet+: 固定幅 */}
                  <div className="w-full sm:w-32 sm:flex-shrink-0">
                    {post.thumbnail ? (
                      <div className="w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden">
                        <Image
                          src={post.thumbnail}
                          alt="thumbnail"
                          className="object-cover w-full h-full"
                          width={160}
                          height={90}
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-sm">画像なし</span>
                      </div>
                    )}
                  </div>

                  {/* コンテンツ - Fluid: 残り領域を使用 */}
                  <div className="flex-grow">
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                        <h2 className="text-lg font-semibold text-gray-800 flex-grow leading-tight">
                          {post.title}
                        </h2>
                        {post.draft && (
                          <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full font-medium flex-shrink-0 self-start">
                            下書き
                          </span>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-500">
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
                  </div>

                  {/* アクション - Mobile: 左寄せ、Desktop: 右寄せ */}
                  <div className="flex sm:flex-col gap-2 sm:flex-shrink-0">
                    <Button
                      onClick={() => router.push(`/admin/edit/${post.id}`)}
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <HiPencilAlt className="w-4 h-4 mr-1" />
                      編集
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedPost(post);
                        setIsDialogOpen(true);
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <HiTrash className="w-4 h-4 mr-1" />
                      削除
                    </Button>
                  </div>
                </div>
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
