const { API_KEY, SERVICE_DOMAIN } = process.env;

export default defineNuxtConfig({
  srcDir: "src/",
  ssr: true,
  runtimeConfig: {
    apiKey: API_KEY,
    serviceDomain: SERVICE_DOMAIN,
  },
  css: ["~/assets/css/reset.css", "~/assets/css/style.css"],
  // tex
  plugins: [
    { src: '~/plugins/mathjax', mode: 'server' },
  ],
  // // OGP
  // app: {
  //   head: {
  //     htmlAttrs: {
  //       lang: 'ja', prefix: 'og: https://ogp.me/ns#'
  //     },
  //     meta: [
  //       { property: 'og:type', content: 'blog' },
  //       { property: 'og:site_name', content: 'Akitoshi Lab.' },
  //       { property: 'og:image', content: '<ogpに使われる画像の絶対パス>', },
  //     ]
  //   }
  // }
});
