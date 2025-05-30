import { pgTable, text, timestamp, boolean, uuid, jsonb, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Posts table
export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  tags: jsonb('tags').$type<string[]>().default([]).notNull(),
  thumbnail: text('thumbnail'),
  draft: boolean('draft').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    createdAtIdx: index('posts_created_at_idx').on(table.createdAt),
    draftIdx: index('posts_draft_idx').on(table.draft),
  };
});

// Type inference
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

// Backup table for posts
export const postsBackup = pgTable('posts_backup', {
  id: uuid('id').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  tags: jsonb('tags').$type<string[]>().default([]).notNull(),
  thumbnail: text('thumbnail'),
  draft: boolean('draft').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
  backedUpAt: timestamp('backed_up_at', { withTimezone: true }).defaultNow().notNull(),
  backupId: uuid('backup_id').defaultRandom().primaryKey(),
}, (table) => {
  return {
    originalIdIdx: index('posts_backup_original_id_idx').on(table.id),
    backedUpAtIdx: index('posts_backup_backed_up_at_idx').on(table.backedUpAt),
  };
});

// Backup metadata table
export const backupMetadata = pgTable('backup_metadata', {
  id: uuid('id').defaultRandom().primaryKey(),
  backupType: text('backup_type').notNull(), // 'manual', 'scheduled', 'before_update', 'before_delete'
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  recordCount: text('record_count').notNull(),
});