/* src/settings/siteSettings.ts */

// Blogの１ページあたりの記事数
export const BLOG_PER_PAGE = 5;

export const config = {
  siteName: "Akitoshi Lab.",
  siteUrl: "https://akitoshi-lab.com",
  siteDescription: "ロボットが好きな大学生です．",
  social: {
    repos: "https://github.com/qlitre/qlitre-weblog-nuxt3",
    github: "https://github.com/qlitre",
    twitter: "@konoe_akitoshi",
    twitterProf: "https://twitter.com/kuri_tter",
    buyMeACoffee: "https://www.buymeacoffee.com/qlitre",
  },
  postListField: 'id,title,description,tag,publishedAt,revisedAt',
  postDetailField: 'id,title,text,description,keywords,thumbnail,tag,tocVisible,useRepeatBody,repeated,related,publishedAt,revisedAt'
};
