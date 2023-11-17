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
    ['@nuxtjs/google-adsense', {
      id: "ca-pub-9582592339710489",
      pageLevelAds: true
    }]
  ],
  // tex
  plugins: [
    { src: '~/plugins/mathjax', mode: 'client' },
    { src: '~/plugins/fontawesome.ts', mode: 'client' },
  ],
});
