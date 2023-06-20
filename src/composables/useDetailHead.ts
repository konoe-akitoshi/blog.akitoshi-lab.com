import { Post } from "../server/api/post-detail";
import { config } from "../settings/site-settings";
function stripHtmlTags(html: string): string {
  const regex = /(<([^>]+)>)/gi;
  return html.replace(regex, "");
}

export const useDetailHead = (post: Post) => {
  const description = stripHtmlTags(post.content).substring(0, 100); // 最初の20文字を取得
  return useHead({
    title: post.title,
    link: [
      {
        rel: "canonical",
        href: `${config.siteUrl}/${post.id}`,
      },
    ],
    meta: [
      { name: "description", content: description },
      { name: "keyword", content: post.keywords },
      { property: "og:url", content: `${config.siteUrl}/${post.id}/` },
      {
        property: "og:type",
        content: "article",
      },
      {
        property: "og:title",
        content: `${post.title} | Akitoshi Lab.`,
      },
      {
        property: "og:description",
        content: post.description,
      },
      {
        property: "og:site_name",
        content: config.siteName,
      },
      {
        property: "og:image",
        content: post.thumbnail ? `${post.thumbnail.url}??fit=crop&w=335&h=176/` : undefined,
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
