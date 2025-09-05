import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import { Transition, Dialog } from '@headlessui/react';
import { Fragment, useMemo, useState } from 'react';
import { signOut } from 'next-auth/react';
import { HiTrash, HiPencilAlt, HiPlus } from 'react-icons/hi';
import Image from 'next/image';
import { requireAuth } from '../../lib/auth';
import PageContainer from '../../components/PageContainer';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { GetServerSidePropsContext, Post } from '@/types';
import { GetServerSidePropsResult } from 'next';

interface AdminPost extends Omit<Post, 'content'> {
  draft?: boolean;
}

interface AdminPageProps {
  posts: AdminPost[];
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<AdminPageProps>> {
  const authResult = await requireAuth(context);

  if ('redirect' in authResult) {
    return authResult as GetServerSidePropsResult<AdminPageProps>; // 認証されていない場合のリダイレクト処理
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

const Admin = ({ posts }: AdminPageProps) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<AdminPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDraftOnly, setShowDraftOnly] = useState(false);
  const [sortKey, setSortKey] = useState<'newest' | 'oldest' | 'updated' | 'title_asc' | 'title_desc'>("newest");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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
      alert('記事を削除しました');
      router.reload(); // ページをリロード
    }
    setIsDialogOpen(false);
  };

  const stats = useMemo(() => {
    const total = posts.length;
    const drafts = posts.filter(p => p.draft).length;
    const published = total - drafts;
    return { total, drafts, published };
  }, [posts]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const processedPosts = useMemo(() => {
    let list = [...posts];

    if (showDraftOnly) {
      list = list.filter(p => !!p.draft);
    }

    if (normalizedQuery) {
      list = list.filter(p => {
        const inTitle = p.title?.toLowerCase().includes(normalizedQuery);
        const inTags = Array.isArray(p.tags) && p.tags.join(' ').toLowerCase().includes(normalizedQuery);
        return inTitle || inTags;
      });
    }

    list.sort((a, b) => {
      switch (sortKey) {
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'updated':
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case 'title_asc':
          return a.title.localeCompare(b.title, 'ja');
        case 'title_desc':
          return b.title.localeCompare(a.title, 'ja');
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return list;
  }, [posts, showDraftOnly, normalizedQuery, sortKey]);

  const totalPages = Math.max(1, Math.ceil(processedPosts.length / pageSize));
  const pageStart = (currentPage - 1) * pageSize;
  const pagedPosts = useMemo(() => processedPosts.slice(pageStart, pageStart + pageSize), [processedPosts, pageStart, pageSize]);

  const handleChangePage = (next: number) => {
    const page = Math.min(Math.max(1, next), totalPages);
    setCurrentPage(page);
    // スクロールを少し戻して上部ツールバーが見えるように
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <PageContainer maxWidth="lg" className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">コンテンツ管理</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push('/admin/create')}
            variant="primary"
            size="md"
            className="flex items-center"
          >
            <HiPlus className="mr-2" />
            新規作成
          </Button>
          <Button
            onClick={() => signOut({ callbackUrl: '/login' })}
            variant="outline"
            size="md"
          >
            ログアウト
          </Button>
        </div>
      </div>

      <Card variant="subtle" className="mb-6 sticky top-0 z-10">
        <Card.Content className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5">
            <label className="block text-xs text-gray-600 mb-1">検索</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="タイトル・タグで検索"
              className="w-full rounded-md border border-mono-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mono-500 focus:border-mono-500 bg-white"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">並び替え</label>
            <select
              value={sortKey}
              onChange={(e) => { setSortKey(e.target.value as any); setCurrentPage(1); }}
              className="w-full rounded-md border border-mono-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-mono-500 focus:border-mono-500"
            >
              <option value="newest">作成日 新しい順</option>
              <option value="oldest">作成日 古い順</option>
              <option value="updated">更新日 新しい順</option>
              <option value="title_asc">タイトル あ→わ</option>
              <option value="title_desc">タイトル わ→あ</option>
            </select>
          </div>
          <div className="md:col-span-2 flex items-end">
            <label className="inline-flex items-center gap-2 text-sm select-none">
              <input
                type="checkbox"
                checked={showDraftOnly}
                onChange={(e) => { setShowDraftOnly(e.target.checked); setCurrentPage(1); }}
                className="h-4 w-4 rounded border-mono-300 text-mono-800 focus:ring-mono-500"
              />
              下書きのみ
            </label>
          </div>
          <div className="md:col-span-2 flex items-end justify-end gap-2">
            <div className="text-xs text-gray-600">
              合計 {stats.total}件（公開 {stats.published}・下書き {stats.drafts}）
            </div>
          </div>
        </Card.Content>
      </Card>

      {processedPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">条件に一致する記事がありません。</p>
        </div>
      ) : (
        <>
        <div className="space-y-6">
          {pagedPosts.map((post) => (
            <Card
              key={post.id}
              variant={post.draft ? "outlined" : "default"}
              className={`${
                post.draft ? 'opacity-80 border-2 border-yellow-400' : ''
              }`}
            >
              <Card.Content className="p-5">
                {/* Mobile-First: 縦並び、タブレット以上で横並び */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-8">
                  {/* サムネイル - Mobile: 100%, Tablet+: 固定幅 */}
                  <div className="w-full sm:w-64 sm:flex-shrink-0">
                    {post.thumbnail ? (
                      <div className="w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden">
                        <Image
                          src={post.thumbnail}
                          alt="thumbnail"
                          className="object-cover w-full h-full"
                          width={256}
                          height={144}
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-sm">画像なし</span>
                      </div>
                    )}
                  </div>

                  {/* コンテンツ - Fluid: 残り領域を使用 */}
                  <div className="flex-grow min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <h2 className="text-lg font-semibold text-gray-800 flex-grow leading-tight mt-2">
                          {post.title}
                        </h2>
                        {post.draft && (
                          <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full font-medium flex-shrink-0 self-start">
                            下書き
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })} • 
                        更新: {new Date(post.updated_at).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
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
                  <div className="flex sm:flex-col gap-2 sm:flex-shrink-0 sm:w-28">
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
        {/* Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="text-gray-600">
            {processedPosts.length}件中 {processedPosts.length === 0 ? 0 : pageStart + 1}–{Math.min(pageStart + pageSize, processedPosts.length)}件を表示
          </div>
          <div className="flex items-center gap-2">
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(parseInt(e.target.value, 10)); setCurrentPage(1); }}
              className="rounded-md border border-mono-300 px-2 py-1 bg-white"
            >
              <option value={5}>5件/ページ</option>
              <option value={10}>10件/ページ</option>
              <option value={20}>20件/ページ</option>
            </select>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" onClick={() => handleChangePage(1)} disabled={currentPage === 1}>«</Button>
              <Button variant="outline" size="sm" onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1}>前へ</Button>
              <span className="px-2">{currentPage} / {totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPages}>次へ</Button>
              <Button variant="outline" size="sm" onClick={() => handleChangePage(totalPages)} disabled={currentPage === totalPages}>»</Button>
            </div>
          </div>
        </div>
        </>
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
                削除の確認
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-600 mt-2">
                「{selectedPost?.title}」を削除しますか？この操作は取り消せません。
              </Dialog.Description>
              <div className="mt-4 flex justify-end space-x-4">
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  variant="outline"
                >
                  キャンセル
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="danger"
                >
                  削除
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
