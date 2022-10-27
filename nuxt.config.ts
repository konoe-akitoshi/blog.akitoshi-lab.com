const { API_KEY, SERVICE_DOMAIN } = process.env;

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // 配信フォルダをclientに
  srcDir: "client/",
  // .envファイルの読み込み
  privateRuntimeConfig: {
    apiKey: API_KEY,
    serviceDomain: SERVICE_DOMAIN,
  },
  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== "production" ? API_KEY : undefined,
    serviceDomain:
      process.env.NODE_ENV !== "production" ? SERVICE_DOMAIN : undefined,
  },
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  // global cssの読み込み
  css: ["@/assets/css/reset.css", "@/assets/css/style.css"],
});
