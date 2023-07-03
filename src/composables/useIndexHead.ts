import { config } from "../settings/site-settings";

export const useIndexHead = (meta) => {
  const canonicalUrl = meta.title === "Home" ? config.siteUrl : `${config.siteUrl}/${meta.title}/`;

  return useHead({
    title: config.siteName,
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
    ],
    meta: [
      { name: "description", content: config.siteDescription },
      { name: "keyword", content: "ロボット, ブログ" },
      { property: "og:url", content: canonicalUrl },
      {
        property: "og:type",
        content: "article",
      },
      {
        property: "og:title",
        content: `${meta.title} | Akitoshi Lab.`,
      },
      {
        property: "og:description",
        content: config.siteDescription,
      },
      {
        property: "og:site_name",
        content: config.siteName,
      },
      {
        property: "og:image",
        content: `../assets/img/OGP.webp`,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:site",
        content: config.social.twitter,
      },
    ],
  });
};
