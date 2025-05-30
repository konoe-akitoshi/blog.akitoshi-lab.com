.PHONY: help up down build logs shell db-shell db-studio migrate backup restore clean

# デフォルトターゲット
help:
	@echo "使用可能なコマンド:"
	@echo "  make up          - Dockerコンテナを起動"
	@echo "  make down        - Dockerコンテナを停止"
	@echo "  make build       - Dockerイメージをビルド"
	@echo "  make logs        - ログを表示"
	@echo "  make shell       - Next.jsコンテナにシェルでアクセス"
	@echo "  make db-shell    - PostgreSQLコンテナにシェルでアクセス"
	@echo "  make db-studio   - Drizzle Studioを起動"
	@echo "  make migrate     - データベースマイグレーションを実行"
	@echo "  make backup      - データベースの手動バックアップ"
	@echo "  make restore     - バックアップからリストア"
	@echo "  make clean       - Dockerボリュームを削除（注意：データが消えます）"

# Dockerコンテナを起動
up:
	docker-compose up -d
	@echo "アプリケーション: http://localhost:3000"
	@echo "pgAdmin: http://localhost:5050"

# Dockerコンテナを停止
down:
	docker-compose down

# Dockerイメージをビルド
build:
	docker-compose build --no-cache

# ログを表示
logs:
	docker-compose logs -f

# Next.jsコンテナにシェルでアクセス
shell:
	docker-compose exec nextjs sh

# PostgreSQLコンテナにシェルでアクセス
db-shell:
	docker-compose exec postgres psql -U bloguser -d blog_db

# Drizzle Studioを起動
db-studio:
	docker-compose exec nextjs pnpm db:studio

# データベースマイグレーションを実行
migrate:
	docker-compose exec nextjs pnpm db:push

# Supabaseからデータを移行
migrate-from-supabase:
	docker-compose exec nextjs pnpm db:migrate-from-supabase

# データベースの手動バックアップ
backup:
	@mkdir -p ./backups/manual
	@TIMESTAMP=$$(date +%Y%m%d_%H%M%S); \
	docker-compose exec postgres pg_dump -U bloguser blog_db > ./backups/manual/backup_manual_$$TIMESTAMP.sql && \
	echo "バックアップ完了: ./backups/manual/backup_manual_$$TIMESTAMP.sql"

# バックアップからリストア
restore:
	@echo "利用可能なバックアップ:"
	@ls -la ./backups/manual/*.sql 2>/dev/null || echo "バックアップファイルが見つかりません"
	@echo ""
	@echo "リストアするには以下のコマンドを実行:"
	@echo "docker-compose exec -T postgres psql -U bloguser blog_db < ./backups/manual/[バックアップファイル名]"

# Dockerボリュームを削除（注意：データが消えます）
clean:
	@echo "警告: この操作はすべてのデータを削除します！"
	@echo "続行するには 'yes' と入力してください:"
	@read confirm && [ "$$confirm" = "yes" ] || (echo "キャンセルしました" && exit 1)
	docker-compose down -v
	rm -rf ./backups/*

# 開発環境のセットアップ
setup:
	@echo "環境変数ファイルをコピー..."
	@cp -n .env.example .env || echo ".envファイルは既に存在します"
	@echo "Dockerイメージをビルド..."
	@make build
	@echo "コンテナを起動..."
	@make up
	@echo "データベースマイグレーションを実行..."
	@sleep 10
	@make migrate
	@echo ""
	@echo "セットアップ完了！"
	@echo "アプリケーション: http://localhost:3000"
	@echo "pgAdmin: http://localhost:5050"