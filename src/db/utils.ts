import { db } from './index';
import { posts, postsBackup, backupMetadata, type Post, type NewPost } from './schema';
import { eq, desc, and, sql } from 'drizzle-orm';

// バックアップ関数
export async function backupPost(postId: string, backupType: string, description?: string) {
  const post = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
  
  if (post.length === 0) {
    throw new Error('Post not found');
  }

  const [backupRecord] = await db.insert(postsBackup).values({
    ...post[0],
    backupId: undefined, // 新しいUUIDが自動生成される
    backedUpAt: new Date(),
  }).returning();

  return backupRecord;
}

// 全記事のバックアップ
export async function backupAllPosts(backupType: string, description?: string) {
  const allPosts = await db.select().from(posts);
  
  if (allPosts.length === 0) {
    return [];
  }

  const backupRecords = await db.insert(postsBackup).values(
    allPosts.map(post => ({
      ...post,
      backupId: undefined,
      backedUpAt: new Date(),
    }))
  ).returning();

  // バックアップメタデータを記録
  await db.insert(backupMetadata).values({
    backupType,
    description,
    recordCount: String(backupRecords.length),
  });

  return backupRecords;
}

// 記事の復元
export async function restorePost(backupId: string) {
  const [backup] = await db.select().from(postsBackup).where(eq(postsBackup.backupId, backupId)).limit(1);
  
  if (!backup) {
    throw new Error('Backup not found');
  }

  const { backupId: _, backedUpAt, ...postData } = backup;
  
  const [restoredPost] = await db.insert(posts).values({
    ...postData,
    updatedAt: new Date(),
  }).onConflictDoUpdate({
    target: posts.id,
    set: {
      title: postData.title,
      content: postData.content,
      tags: postData.tags,
      thumbnail: postData.thumbnail,
      draft: postData.draft,
      updatedAt: new Date(),
    },
  }).returning();

  return restoredPost;
}

// 記事のCRUD操作
export const postOperations = {
  // 全記事取得（公開記事のみ）
  async getAllPublished() {
    return await db.select()
      .from(posts)
      .where(eq(posts.draft, false))
      .orderBy(desc(posts.createdAt));
  },

  // 全記事取得（下書き含む）
  async getAll() {
    return await db.select()
      .from(posts)
      .orderBy(desc(posts.createdAt));
  },

  // ID指定で記事取得
  async getById(id: string) {
    const [post] = await db.select()
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);
    return post;
  },

  // タグで記事検索
  async getByTag(tag: string) {
    return await db.select()
      .from(posts)
      .where(
        and(
          eq(posts.draft, false),
          sql`${posts.tags}::jsonb @> ${JSON.stringify([tag])}::jsonb`
        )
      )
      .orderBy(desc(posts.createdAt));
  },

  // 記事作成（バックアップなし）
  async create(data: NewPost) {
    const [newPost] = await db.insert(posts).values(data).returning();
    return newPost;
  },

  // 記事更新（更新前に自動バックアップ）
  async update(id: string, data: Partial<NewPost>) {
    // 更新前にバックアップ
    await backupPost(id, 'before_update', `Auto backup before updating post ${id}`);
    
    const [updatedPost] = await db.update(posts)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))
      .returning();
    
    return updatedPost;
  },

  // 記事削除（削除前に自動バックアップ）
  async delete(id: string) {
    // 削除前にバックアップ
    await backupPost(id, 'before_delete', `Auto backup before deleting post ${id}`);
    
    const [deletedPost] = await db.delete(posts)
      .where(eq(posts.id, id))
      .returning();
    
    return deletedPost;
  },
};

// バックアップ操作
export const backupOperations = {
  // 特定の記事のバックアップ履歴取得
  async getPostBackups(postId: string) {
    return await db.select()
      .from(postsBackup)
      .where(eq(postsBackup.id, postId))
      .orderBy(desc(postsBackup.backedUpAt));
  },

  // 全バックアップメタデータ取得
  async getAllBackupMetadata() {
    return await db.select()
      .from(backupMetadata)
      .orderBy(desc(backupMetadata.createdAt));
  },

  // 古いバックアップの削除（30日以上前）
  async cleanOldBackups(daysToKeep: number = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    const deleted = await db.delete(postsBackup)
      .where(sql`${postsBackup.backedUpAt} < ${cutoffDate}`)
      .returning();
    
    return deleted.length;
  },
};