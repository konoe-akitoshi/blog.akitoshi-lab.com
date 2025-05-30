# DrizzleORM移行ガイド

このガイドでは、SupabaseからDrizzleORMへの移行手順を説明します。

## 1. 環境変数の設定

`.env.local`ファイルに以下の環境変数を追加してください：

```env
# PostgreSQLデータベースURL
DATABASE_URL=postgresql://username:password@localhost:5432/blog_db

# 既存のSupabase設定（移行時に必要）
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 2. データベースのセットアップ

### ローカルPostgreSQLの場合

```bash
# PostgreSQLがインストールされていない場合
brew install postgresql@16
brew services start postgresql@16

# データベースの作成
createdb blog_db
```

### Supabase PostgreSQLを使い続ける場合

SupabaseのダッシュボードからDatabase URLを取得し、`DATABASE_URL`に設定してください。

## 3. マイグレーションの実行

```bash
# スキーマからマイグレーションファイルを生成
pnpm db:generate

# マイグレーションを実行
pnpm db:push

# Supabaseからデータを移行
pnpm db:migrate-from-supabase
```

## 4. DrizzleStudioでデータを確認

```bash
pnpm db:studio
```

ブラウザで http://localhost:4983 を開いてデータベースの内容を確認できます。

## 主な変更点

### 1. データベース操作

**Before (Supabase):**
```typescript
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('draft', false);
```

**After (DrizzleORM):**
```typescript
const posts = await postOperations.getAllPublished();
```

### 2. バックアップ機能

DrizzleORMへの移行により、以下のバックアップ機能が追加されました：

- **自動バックアップ**: 記事の更新・削除前に自動的にバックアップ
- **手動バックアップ**: 任意のタイミングでバックアップ可能
- **バックアップ履歴**: 各記事のバックアップ履歴を確認可能
- **復元機能**: バックアップから記事を復元可能

### 3. API構成

管理画面の操作はAPIエンドポイント経由で行うように変更されました：

- `GET /api/admin/posts` - 全記事取得
- `POST /api/admin/posts` - 記事作成
- `PUT /api/admin/posts/[id]` - 記事更新
- `DELETE /api/admin/posts/[id]` - 記事削除
- `GET /api/posts/[id]` - 個別記事取得

## トラブルシューティング

### データベース接続エラー

```
Error: Can't reach database server at `localhost:5432`
```

PostgreSQLが起動していることを確認してください：
```bash
brew services list
```

### マイグレーションエラー

既存のテーブルがある場合は、一度削除してから再実行してください：
```bash
# Drizzle Studioで手動で削除するか、以下のコマンドを実行
psql blog_db -c "DROP TABLE IF EXISTS posts, posts_backup, backup_metadata CASCADE;"
```

## バックアップの管理

### 定期的なバックアップ

```typescript
// 全記事のバックアップ
await backupAllPosts('scheduled', 'Daily backup');
```

### 古いバックアップの削除

```typescript
// 30日以上前のバックアップを削除
await backupOperations.cleanOldBackups(30);
```

## 今後の拡張

1. **定期バックアップのcron設定**
2. **バックアップのエクスポート機能**
3. **差分バックアップ**
4. **バックアップの圧縮**