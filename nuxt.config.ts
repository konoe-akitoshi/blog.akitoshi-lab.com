const { API_KEY, SERVICE_DOMAIN } = process.env;
import { createClient } from 'microcms-js-sdk';

export default defineNuxtConfig({
  srcDir: "src/",
  ssr: true,
  runtimeConfig: {
    apiKey: API_KEY,
    serviceDomain: SERVICE_DOMAIN,
  },
  css: [
    "~/assets/css/reset.css",
    "~/assets/css/style.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],

  app: {
    pageTransition: { name: 'page', mode: 'default' }
  },
  modules: [
    '@nuxt/image',
    '@nuxtjs/robots', // @nuxtjs/robots モジュールを追加
    'nuxt-simple-sitemap',
    ['@nuxtjs/google-adsense', {
      id: "ca-pub-9582592339710489",
      pageLevelAds: true
    }]
  ],
  // sitemap の設定
  simpleSitemap: {
    hostname: 'https://akitoshi-lab.com',
    gzip: true,
    // 他の設定...
  },
  // robots.txt の設定
  robots: {
    UserAgent: '*', // すべてのクローラーに適用
    Disallow: '',   // すべてのページをクロール許可
    // 他の設定が必要な場合はここに追加
  },
  // 画像の最適化設定
  image: {
    // 画像の最適化に関する設定をここに追加
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    },
    // domains: ['https://images.microcms-assets.io'], // 画像のドメインを指定
  },

  plugins: [
    { src: '~/plugins/mathjax', mode: 'client' },
    { src: '~/plugins/fontawesome.ts', mode: 'client' },
  ],

  // その他のパフォーマンス向上のための設定
  build: {
    // 例: JavaScriptのファイルサイズを小さくする
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  },
});
