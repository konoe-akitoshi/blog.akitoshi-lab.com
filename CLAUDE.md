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