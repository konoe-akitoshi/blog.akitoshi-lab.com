const { API_KEY, SERVICE_DOMAIN } = process.env;

export default defineNuxtConfig({
  srcDir: "src/",
  ssr: true,
  mode: "universal",
  target: "server",
  runtimeConfig: {
    apiKey: API_KEY,
    serviceDomain: SERVICE_DOMAIN,
  },
  css: ["~/assets/css/reset.css", "~/assets/css/style.css",'@fortawesome/fontawesome-svg-core/styles.css'],
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
    '@/plugins/fontawesome.ts',
  ],
});
