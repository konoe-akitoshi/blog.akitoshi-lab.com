# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Build and Development
- `pnpm dev` - Start development server with Turbopack (faster than default)
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint to check code quality

### Package Management
- This project uses `pnpm` (evidenced by `pnpm-lock.yaml`)
- Use `pnpm install` to install dependencies
- Use `pnpm add <package>` to add new dependencies

## Architecture Overview

This is a **Next.js 15** blog application with the following key characteristics:

### Tech Stack
- **Framework**: Next.js 15 with Pages Router (not App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js with credentials provider
- **Content**: Zenn-compatible markdown rendering
- **Language**: JavaScript (not TypeScript, despite having TypeScript dependencies)

### Key Architecture Patterns

#### Pages Router Structure
- Uses `/src/pages/` directory for routing
- API routes in `/src/pages/api/`
- Dynamic routes: `[id].js` for posts, `[tag].js` for tags
- Admin area at `/admin/` with authentication protection

#### Authentication System
- NextAuth.js configured with simple credentials provider
- Hardcoded admin credentials (username: 'admin', password: 'pass')
- Authentication utility function `requireAuth()` in `/src/lib/auth.js`
- Protected admin routes for content management

#### Content Management
- Blog posts stored in Supabase database
- Admin interface for creating/editing posts at `/admin/`
- Markdown rendering with Zenn content CSS for styling
- Support for thumbnails and tags

#### Component Structure
- Reusable components in `/src/components/`
- Layout component provides sidebar navigation
- Specialized components: `PostContent`, `PostList`, `TOC`, `OGPCard`
- Mobile-responsive design with `MobileTOC`

#### Data Layer
- Supabase client configuration in `/src/lib/supabase.js`
- Environment variables for Supabase URL and keys
- Database operations likely handled through Supabase client

### Important Notes
- The app uses Japanese comments and UI text
- Markdown content is processed with Zenn's markdown parser
- OGP (Open Graph Protocol) card generation for link previews
- Table of Contents (TOC) generation for blog posts
- Tag-based categorization system

### Environment Setup
Requires these environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXTAUTH_SECRET`

## Design Rules and Principles

When implementing UI/UX and visual design, follow these theoretical principles:

### Visual Layout Principles

| 理論 | 適用 |
|------|------|
| **ゲシュタルトの法則** | 近接や類似で要素をグループ化し、関連性を明確化 |
| **黄金比** | 画像トリミング、2カラム幅、余白比率に約1:1.618の比率を適用 |
| **三分割法** | ヒーローイメージ・主要コンテンツを縦横3分割グリッドに配置 |
| **Z字/F字レイアウト** | 見出しやCTAを視線経路上に配置 |
| **視覚階層** | タイトルを大きく、補助情報を小さく、大きさ・色・余白で重要度を区別 |
| **ホワイトスペース活用** | セクション間・要素間に適切な余白を確保 |

### Color Theory

| 理論 | 適用 |
|------|------|
| **色相環** | 補色・類似色・トライアド配色の検討 |
| **モノクロマティック配色** | 同系色で一体感と上質感を演出 |
| **類似色配色** | 色相環の隣接色でトーンを統一 |
| **補色配色** | CTAや強調部分で色相環の正反対の色を使用 |
| **色彩心理** | 青＝安心感、赤＝注意喚起などを意図的に使用 |

### UI/UX Laws

| 法則 | 適用 |
|------|------|
| **ヤコブの法則** | 慣習的UI（ハンバーガーメニュー等）を踏襲 |
| **ヒックの法則** | メニュー数を絞り選択肢を整理 |
| **フィッツの法則** | 大きめのボタン、重要要素を近くに配置 |
| **ミラーの法則** | メニューを7±2項目にチャンク化 |
| **パレートの法則** | よく使う機能に注力、他は簡略化 |
| **テスラーの法則** | ユーザーの負担を減らしシステムで複雑さを処理 |
| **美的ユーザビリティ効果** | ビジュアル品質を上げて心理的満足感を向上 |
| **孤立効果** | 重要ボタンの色や形を周囲と差別化 |
| **ピークエンドの法則** | フィードバックや完了画面をポジティブに設計 |