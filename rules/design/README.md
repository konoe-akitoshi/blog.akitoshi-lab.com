# Design System Documentation

Blog Design System based on theoretical foundations and practical implementation.

## 📋 Documentation Structure

### Core Design Theories
- **[Visual Layout](./visual-layout.md)** - ゲシュタルトの法則、黄金比、三分割法、視覚階層
- **[Color Theory](./color-theory.md)** - 色相環、配色システム、色彩心理
- **[UI/UX Laws](./ui-ux-laws.md)** - ヤコブの法則、ヒックの法則、認知効果
- **[Dieter Rams Principles](./dieter-rams.md)** - 良いデザイン10ヶ条

### Implementation Systems
- **[Spacing System](./spacing-system.md)** - 4pt/8ptグリッド、階層的余白設計
- **[Border Radius](./border-radius.md)** - 入れ子角丸、控えめシステム
- **[Responsive Design](./responsive-design.md)** - 流動的グリッド、柔軟な画像、メディアクエリ

## 🎯 Quick Implementation Guide

### Essential Rules
```css
/* 4pt/8pt Grid System */
--spacing-1: 0.25rem;    /* 4px */
--spacing-2: 0.5rem;     /* 8px */
--spacing-4: 1rem;       /* 16px */
--spacing-8: 2rem;       /* 32px */

/* Nested Border Radius */
--radius-sm: 0.375rem;   /* 6px - buttons */
--radius-base: 0.5rem;   /* 8px - images */
--radius-lg: 0.75rem;    /* 12px - cards */

/* Hierarchy Rule */
innerRadius = outerRadius × 0.75
```

### Component Patterns
- **Cards**: `rounded-lg` (12px) → content `rounded-md` (8px)
- **Images**: Parent container radius -2px for nested effect
- **Buttons**: `rounded-md` (6px) for subtle, approachable feel
- **Spacing**: Internal padding ≤ External margin

## 📖 Usage in Development

When implementing components:
1. **Read relevant theory files** for understanding
2. **Apply core rules** from quick guide
3. **Follow existing patterns** in codebase
4. **Test responsive behavior** on multiple devices

## 🔄 Maintenance

This documentation should be updated when:
- New design patterns are established
- Existing rules are refined
- Component library is extended
- User feedback suggests improvements