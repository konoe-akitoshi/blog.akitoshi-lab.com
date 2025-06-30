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

### ディーター・ラムスによる良いデザイン10ヶ条
Ten principles to good design.

| 原則 | 内容 | 適用 |
|------|------|------|
| **革新的である** | Good design is innovative. | 新しいアプローチや技術を取り入れ、既存の解決策を改善する |
| **実用をもたらす** | Good design makes a product useful. | 機能性を重視し、ユーザーのニーズに応える実用的な設計 |
| **美的である** | Good design is aesthetic. | 視覚的な美しさと調和を追求し、感情的な満足感を提供 |
| **理解をもたらす** | Good design makes a product understandable. | 直感的で分かりやすいUIで、学習コストを最小化 |
| **謙虚である** | Good design is unobtrusive. | デザインが前面に出すぎず、コンテンツや機能を引き立てる |
| **誠実である** | Good design is honest. | 誇張や虚偽がなく、製品の真の価値と機能を表現 |
| **長命である** | Good design has longevity. | 流行に左右されず、長期間使い続けられる普遍的な美しさ |
| **最終的にディティールへと帰結する** | Good design is consequent down to the last detail. | 細部まで一貫性を保ち、全体の品質を向上させる |
| **環境への配慮とともにある** | Good design is environmentally friendly. | 持続可能性を考慮し、無駄を排除したエコデザイン |
| **可能な限りデザインを抑制する** | Good design is as little design as possible. | シンプルさを追求し、本質的な要素のみを残す引き算の美学 |

### 入れ子角丸設計ルール

既存の理論を多用した「入れ子角丸設計ルール」で一貫性のある角丸設計を実現。

#### 🎯 5つの理論的基盤

| 理論 | 原則 | 適用 |
|------|------|------|
| **ゲシュタルトの近接の法則** | 角丸の境界は視覚的な「グループ化」の認知を強める | 外側と内側の曲率差を明確に保つことで階層構造を視覚的に伝える |
| **黄金比・調和比率** | 視覚的調和は一定の比率関係から生まれる（1 : φ ≈ 1 : 1.618） | 内側R = 外側R × 0.618を目安に比率を設定すると自然なバランス |
| **負のスペース理論** | ネガティブスペース（余白）は形状を際立たせる | paddingをRの差分として設計し、視覚的な連続性を確保 |
| **視覚階層の原則** | 大きな曲率は親、緩やかな曲率は子を示す | 階層ごとに段階的にRを減少させる（例：親24px → 子16px） |
| **一貫性の法則** | UIパターンは一貫して適用することで学習コストを下げる | Rの算出式を設計システムで固定化する |

#### ✨ 運用式

```
innerRadius = outerRadius − padding
```

または

```
innerRadius = outerRadius × 0.75 (控えめな角丸)
innerRadius = outerRadius × 0.618 (黄金比ベース)
```

**角丸の度合い調整:**
- **控えめ（推奨）**: 0.75倍で自然な印象
- **黄金比**: 0.618倍で理論的調和
- **最小差分**: 2-4px差で微細な階層表現

#### ✅ チェックリスト

- [ ] 階層差が認知できる角丸の差があるか
- [ ] 親子の角丸が同一でないか
- [ ] ネスト構造に一貫した比率を適用しているか
- [ ] 黄金比や近接の法則を根拠に比率設計しているか

### レスポンシブデザイン理論・原則

モダンなWebデザインにおけるレスポンシブデザインの理論的基盤。

#### 📏 理論体系

| カテゴリ | 原則/理論 | 内容 | Web応用例 |
|----------|-----------|------|-----------|
| **コア概念** | **Fluid Grid（流体グリッド）** | %やfr単位など相対単位でレイアウトを構成し、画面幅に柔軟に対応 | CSS Gridの1fr、Flexboxのflex-grow |
| | **Flexible Media（柔軟なメディア）** | max-width: 100%やheight: autoで要素がコンテナ内で可変調整 | 画像のレスポンシブ対応、動画の可変サイズ |
| | **Media Queries** | @mediaでブレークポイントを設け、デバイス幅に応じたスタイル変更 | sm:、md:、lg:プレフィックスによる段階的調整 |
| **設計指針** | **Mobile-First設計** | 小画面向けスタイルから構築し、min-widthで拡張 | 基本をモバイル、デスクトップで機能拡張 |
| | **コンテンツファースト** | デザインありきではなく内容ありきでブレークポイント設定 | テキスト改行タイミングでのレイアウト分岐 |
| | **Min/Max制限** | max-widthで可読性維持、巨大画面でもコンテンツ幅制限 | デスクトップ最大1200pxのセンタリング |
| **UX理論融合** | **ゲシュタルト原則（近接・継続）** | レイアウト変化時もグループ感や視線パターンを維持 | レスポンシブ時の余白比率・配列リズム維持 |
| | **Progressive Enhancement** | 基本HTML+CSS対応後にJSや拡張スタイルを追加 | JS未対応でも基本機能が利用可能 |

#### ✨ 実装原則

**Ethan Marcolteの三原則**
1. **Fluid Grid**: 相対単位による柔軟なレイアウト
2. **Flexible Media**: コンテナに適応するメディア要素
3. **Media Queries**: デバイス特性に応じたスタイル分岐

**設計指針**
- **Mobile-First**: 軽量・シンプルから拡張
- **Content-Driven Breakpoints**: 幅ではなく内容の折れ方で分岐
- **Performance-Aware**: リソース最適化を含む包括的設計

#### ✅ チェックリスト

- [ ] Fluid Gridによる柔軟なレイアウト構成か
- [ ] Flexible Mediaで画像・動画が適切にスケールするか
- [ ] Media Queriesで段階的なレスポンシブ対応ができているか
- [ ] Mobile-First設計でProgressiveEnhancementを実現しているか
- [ ] コンテンツ主導のブレークポイント設定か
- [ ] ゲシュタルト原則で視覚的一貫性を維持しているか

### スペーシング・グリッドシステム理論

一貫性のある余白・間隔設計による認知負荷軽減とデザイン品質向上。

#### 📐 理論体系

| 原則/理論 | 内容 | Webデザインへの応用 |
|-----------|------|---------------------|
| **グリッドシステム（4pt/8ptグリッド）** | すべての余白・サイズは4pxまたは8pxの整数倍に揃えることで、一貫性と秩序が生まれる | 全マージン・パディング・間隔をspacing-4, spacing-8, spacing-16のようにトークン化し設計システムに登録 |
| **内部余白 ≤ 外部余白ルール** | 親要素の周囲マージンは内側padding以上にして、余白が読みやすい構造を作る | .container { margin: 16px; padding: 8px; }のように外内を明示して一貫性を担保 |
| **一貫性＝認知負荷軽減** | 均一性が保たれることで、ユーザーは余白に気がつかず直感的に操作できるようになる | デバイスポイントごとに同様のグリッド単位を使い、余白のバラツキを回避 |
| **視覚階層とスペーシング** | ゲシュタルトの近接・継続の法則により、余白が関係性と階層を示す役割を果たす | セクション間に24px、要素間に8pxといった明確な階層差を設けることで構造を明らかに |
| **認知心理的快適性** | 均一で整然とした余白は視覚的快適性を向上させ、「不快さ」を感じにくくする | ベゼルとキャリアバー周辺など、画面端の余白も同一ルールに従って調整 |
| **モジュラースケールとの同期** | 階層に応じた間隔設計（4,8,16,24,32…）により、黄金比やリズム感を維持 | タイポやパディングも同一スケールで設計し、量感・視線誘導の調和ベースで整備 |

#### ✨ 実装原則

**4pt/8ptグリッドシステム**
```
基本単位: 4px
推奨スケール: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
```

**階層的スペーシング**
- **要素内余白**: 4px, 8px, 12px
- **要素間余白**: 8px, 16px, 24px  
- **セクション間余白**: 24px, 32px, 48px
- **ページ間余白**: 48px, 64px, 96px

**内部≤外部ルール**
```css
.container {
  margin: 16px;    /* 外部余白 */
  padding: 8px;    /* 内部余白 ≤ 外部余白 */
}
```

#### ✅ チェックリスト

- [ ] 全ての余白・サイズが4px/8ptグリッドに準拠しているか
- [ ] 内部余白が外部余白以下に設定されているか
- [ ] セクション・要素・コンテンツの階層に応じた適切な間隔設定か
- [ ] モジュラースケールによる一貫したリズム感があるか
- [ ] レスポンシブ対応時もグリッドシステムを維持しているか
- [ ] ゲシュタルト法則（近接・継続）による関係性表現ができているか