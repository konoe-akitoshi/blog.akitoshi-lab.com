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
        content: `https://images.microcms-assets.io/assets/a1f82a67495a4c7c8cd02269aa346701/1b10a9dfa3dc476cb8a9154521d1f4bb/OGP.webp`,
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
