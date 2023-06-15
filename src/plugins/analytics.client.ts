import VueGtag from "vue-gtag";

// Nuxtプラグインの登録
export default defineNuxtPlugin((nuxtApp) => {
  // ルーター取得
  const router = useRouter();

  // Vue登録
  nuxtApp.vueApp.use(
    VueGtag,
    {
      appName: "akitoshi-lab.com", // サイトの名称
      pageTrackerScreenviewEnabled: true, // ページトラッキングスクリーンビューを有効
      config: { id: `G-RVMMQ491SE` }, // GoogleAnalytics(GA4)の測定IDを指定する
    },
    router
  );
});
