import { supabase } from '../lib/supabase';
import { db } from './index';
import { posts } from './schema';
import { backupAllPosts } from './utils';

async function migrateFromSupabase() {
  console.log('Starting migration from Supabase to Drizzle...');
  
  try {
    // 1. Supabaseから全記事を取得
    console.log('Fetching posts from Supabase...');
    const { data: supabasePosts, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch posts from Supabase: ${error.message}`);
    }

    if (!supabasePosts || supabasePosts.length === 0) {
      console.log('No posts found in Supabase.');
      return;
    }

    console.log(`Found ${supabasePosts.length} posts in Supabase.`);

    // 2. 既存のDrizzleデータをバックアップ（もしあれば）
    console.log('Backing up existing Drizzle data...');
    await backupAllPosts('migration', 'Backup before Supabase migration');

    // 3. Drizzleにデータを挿入
    console.log('Inserting posts into Drizzle...');
    const insertedPosts = await db.insert(posts).values(
      supabasePosts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        tags: post.tags || [],
        thumbnail: post.thumbnail,
        draft: post.draft || false,
        createdAt: new Date(post.created_at),
        updatedAt: new Date(post.updated_at || post.created_at),
      }))
    ).onConflictDoUpdate({
      target: posts.id,
      set: {
        title: posts.title,
        content: posts.content,
        tags: posts.tags,
        thumbnail: posts.thumbnail,
        draft: posts.draft,
        updatedAt: new Date(),
      },
    }).returning();

    console.log(`Successfully migrated ${insertedPosts.length} posts.`);

    // 4. 検証
    const drizzlePosts = await db.select().from(posts);
    console.log(`Verification: ${drizzlePosts.length} posts now in Drizzle database.`);

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

// スクリプトとして実行される場合
if (require.main === module) {
  migrateFromSupabase()
    .then(() => {
      console.log('Migration script finished.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration script failed:', error);
      process.exit(1);
    });
}

export { migrateFromSupabase };