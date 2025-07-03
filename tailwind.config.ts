import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f5f5f5", // Notionの背景色
        secondary: "#ffffff", // コンテンツ部分
        border: "#e0e0e0", // 境界線色
        // モノクロベース カラーパレット
        mono: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        accent: {
          50: "#f8f8f8",
          100: "#f0f0f0",
          200: "#e0e0e0",
          300: "#c0c0c0",
          400: "#999999",
          500: "#666666",
          600: "#4a4a4a",
          700: "#333333",
          800: "#1a1a1a",
          900: "#0d0d0d",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Notion風のフォント
      },
    },
  },
  plugins: [],
} satisfies Config;
