# ビルドステージ
FROM node:20-alpine AS builder

# 必要なパッケージをインストール
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# pnpmをインストール
RUN corepack enable && corepack prepare pnpm@latest --activate

# 依存関係ファイルをコピー
COPY package.json pnpm-lock.yaml ./

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# アプリケーションのソースコードをコピー
COPY . .

# ビルド
RUN pnpm build

# 実行ステージ
FROM node:20-alpine AS runner

# 必要なパッケージをインストール
RUN apk add --no-cache libc6-compat

WORKDIR /app

# pnpmをインストール
RUN corepack enable && corepack prepare pnpm@latest --activate

# 非rootユーザーを作成
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# 必要なファイルをコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# パッケージファイルをコピー（開発モード用）
COPY package.json pnpm-lock.yaml ./
COPY drizzle.config.ts ./
COPY src/db ./src/db

# 開発モード用の依存関係をインストール
RUN pnpm install --frozen-lockfile

# ユーザーを切り替え
USER nextjs

# ポートを公開
EXPOSE 3000

# 環境変数を設定
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# アプリケーションを起動
CMD ["node", "server.js"]