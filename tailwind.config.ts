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
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Notion風のフォント
      },
    },
  },
  plugins: [],
} satisfies Config;
