# Docker環境セットアップガイド

このプロジェクトは、Docker Composeを使用してNext.jsアプリケーションとPostgreSQLデータベースをコンテナ化しています。

## 必要な環境

- Docker Desktop (Mac/Windows) または Docker Engine (Linux)
- Docker Compose
- Make (オプション、Makefileを使用する場合)

## クイックスタート

### 1. 環境変数の設定

```bash
cp .env.example .env
```

`.env`ファイルを編集して、必要な環境変数を設定してください。

### 2. Makeを使用する場合（推奨）

```bash
# 初回セットアップ（イメージビルド、コンテナ起動、マイグレーション実行）
make setup

# 通常の起動
make up

# 停止
make down

# ログ確認
make logs
```

### 3. Docker Composeを直接使用する場合

```bash
# イメージをビルド
docker-compose build

# コンテナを起動
docker-compose up -d

# マイグレーションを実行
docker-compose exec nextjs pnpm db:push

# 停止
docker-compose down
```

## アクセスURL

- **Next.jsアプリケーション**: http://localhost:3000
- **pgAdmin（DB管理画面）**: http://localhost:5050
  - Email: admin@blog.local
  - Password: admin

## 主な機能

### 1. 自動バックアップ

バックアップサービスが以下のスケジュールで自動実行されます：

- **デイリーバックアップ**: 毎日午前3時（7日間保持）
- **ウィークリーバックアップ**: 毎週日曜日午前4時（4週間保持）
- **マンスリーバックアップ**: 毎月1日午前5時（12ヶ月保持）

バックアップファイルは`./backups`ディレクトリに保存されます。

### 2. 手動バックアップとリストア

```bash
# 手動バックアップ
make backup

# リストア（バックアップファイルを指定）
docker-compose exec -T postgres psql -U bloguser blog_db < ./backups/manual/backup_manual_20240530_120000.sql
```

### 3. データベース管理

```bash
# PostgreSQLに直接接続
make db-shell

# Drizzle Studio（GUI）を起動
make db-studio
```

### 4. 開発作業

```bash
# Next.jsコンテナにシェルでアクセス
make shell

# コンテナ内でコマンド実行
docker-compose exec nextjs pnpm [コマンド]
```

## ディレクトリ構造

```
.
├── docker/
│   ├── postgres/
│   │   └── init/          # PostgreSQL初期化スクリプト
│   └── scripts/
│       └── backup.sh      # 自動バックアップスクリプト
├── backups/               # バックアップファイル保存先
│   ├── daily/
│   ├── weekly/
│   ├── monthly/
│   └── manual/
├── docker-compose.yml     # Docker Compose設定
├── Dockerfile            # 本番用Dockerfile
├── Dockerfile.dev        # 開発用Dockerfile
└── Makefile             # 便利コマンド集
```

## トラブルシューティング

### ポートが既に使用されている

```bash
# 使用中のポートを確認
lsof -i :3000
lsof -i :5432
lsof -i :5050

# プロセスを終了するか、docker-compose.ymlでポートを変更
```

### データベース接続エラー

```bash
# コンテナの状態を確認
docker-compose ps

# PostgreSQLのログを確認
docker-compose logs postgres

# ヘルスチェック状態を確認
docker-compose ps
```

### ボリュームのリセット（注意：データが消えます）

```bash
make clean
# または
docker-compose down -v
```

## 本番環境へのデプロイ

本番環境では`Dockerfile`（開発用ではない方）を使用し、以下の点に注意してください：

1. 環境変数を本番用に設定
2. `NODE_ENV=production`を設定
3. バックアップの外部ストレージへの保存を検討
4. SSL/TLSの設定
5. リバースプロキシ（Nginx等）の設定

## Supabaseからの移行

既存のSupabaseデータを移行する場合：

```bash
# Supabaseの環境変数が設定されていることを確認
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY

# 移行スクリプトを実行
make migrate-from-supabase
```

## セキュリティに関する注意

- `.env`ファイルは絶対にGitにコミットしないでください
- 本番環境では強力なパスワードを使用してください
- 定期的にバックアップを外部ストレージに保存してください
- PostgreSQLのポート（5432）は本番環境では外部に公開しないでください