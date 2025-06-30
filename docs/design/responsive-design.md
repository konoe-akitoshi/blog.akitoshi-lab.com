# Responsive Design Theory

レスポンシブデザインの3つの基本原則。

## Ethan Marrotteの3原則

### 1. Fluid Grid (流動的グリッド)
```css
/* 固定幅の代わりに相対単位を使用 */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.grid-item {
  width: calc(50% - 1rem); /* 固定値ではなく計算値 */
}
```

### 2. Flexible Images (柔軟な画像)
```css
img {
  max-width: 100%;
  height: auto;
}

/* Next.js Image component */
<Image 
  src={src} 
  alt={alt}
  fill
  className="object-cover"
/>
```

### 3. Media Queries (メディアクエリ)
```css
/* Mobile First アプローチ */
.element {
  /* mobile styles */
}

@media (min-width: 768px) {
  .element {
    /* tablet styles */
  }
}

@media (min-width: 1024px) {
  .element {
    /* desktop styles */
  }
}
```

## Tailwind実装

### ブレークポイント
- `sm:` = 640px以上
- `md:` = 768px以上  
- `lg:` = 1024px以上
- `xl:` = 1280px以上

### レスポンシブパターン
```jsx
<div className="flex flex-col md:flex-row">
  <div className="w-full md:w-2/3">Content</div>
  <div className="w-full md:w-1/3">Sidebar</div>
</div>
```