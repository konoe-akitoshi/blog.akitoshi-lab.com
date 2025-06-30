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

When implementing UI/UX and visual design, follow these theoretical principles.

**📋 Design Documentation Structure:**
- **Visual Layout**: `/docs/design/visual-layout.md` - ゲシュタルトの法則、黄金比、三分割法
- **Color Theory**: `/docs/design/color-theory.md` - 色相環、配色システム、色彩心理
- **UI/UX Laws**: `/docs/design/ui-ux-laws.md` - ヤコブの法則、ヒックの法則、認知効果
- **Dieter Rams**: `/docs/design/dieter-rams.md` - 良いデザイン10ヶ条
- **Spacing System**: `/docs/design/spacing-system.md` - 4pt/8ptグリッド、階層的余白
- **Border Radius**: `/docs/design/border-radius.md` - 入れ子角丸、控えめシステム
- **Responsive Design**: `/docs/design/responsive-design.md` - 流動的グリッド、柔軟な画像、メディアクエリ

### Essential Design Principles

**Core Implementation Rules:**
- **4pt/8pt Grid**: All spacing follows 4px/8px multiples
- **Nested Border Radius**: Inner radius ≤ Outer radius × 0.75
- **Internal ≤ External Spacing**: Element padding ≤ container margin
- **Mobile-First**: Progressive enhancement from small screens
- **Visual Hierarchy**: Size, color, spacing differentiate importance
- **Minimal Aesthetic**: Essential elements only, reduce cognitive load

**Design Documentation**: See `/docs/design/` for complete theoretical foundations and implementation details.