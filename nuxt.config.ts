const { API_KEY, SERVICE_DOMAIN } = process.env;

export default defineNuxtConfig({
  srcDir: "src/",
  // ssr: true,
  runtimeConfig: {
    apiKey: API_KEY,
    serviceDomain: SERVICE_DOMAIN,
  },
  css: ["~/assets/css/reset.css", "~/assets/css/style.css"],
  modules: [
    '@nuxt/image',
  ],
  // tex
  plugins: [
    { src: '~/plugins/mathjax', mode: 'client' },
  ],
  // image: {
  //   provider: 'static',
  //   static: {
  //     baseURL: '/',
  //   },
  // },
});
