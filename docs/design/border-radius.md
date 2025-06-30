# Border Radius Design

入れ子角丸設計ルールと控えめな角丸システム。

## 入れ子角丸設計ルール

### 基本原則
```
親要素の角丸 > 子要素の角丸
外側 > 内側の関係を保持
```

### 実装例
```css
/* 親カード */
.card { border-radius: 12px; }

/* 子画像 */
.card img { border-radius: 8px; }

/* 孫要素（タグ等）*/
.card .tag { border-radius: 4px; }
```

## 控えめ角丸システム

### サイズ定義
```css
:root {
  --radius-xs: 0.25rem;    /* 4px - 最小要素 */
  --radius-sm: 0.375rem;   /* 6px - ボタン・小要素 */
  --radius-base: 0.5rem;   /* 8px - 中要素・画像 */
  --radius-md: 0.625rem;   /* 10px - 大要素 */
  --radius-lg: 0.75rem;    /* 12px - カードコンテナ */
  --radius-xl: 1rem;       /* 16px - 大型カード */
}
```

### 適用指針
- **最小要素**: タグ、バッジ → 4px
- **小要素**: ボタン、フォーム → 6px
- **中要素**: 画像、アイコン → 8px
- **大要素**: カード、パネル → 10-12px
- **特大要素**: モーダル、ページ → 16px

## Tailwind対応
- `rounded` = 4px
- `rounded-md` = 6px
- `rounded-lg` = 8px
- `rounded-xl` = 12px
- `rounded-2xl` = 16px