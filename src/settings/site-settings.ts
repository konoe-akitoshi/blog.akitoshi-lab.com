/* src/settings/siteSettings.ts */

// Blogの１ページあたりの記事数
export const BLOG_PER_PAGE = 10;

export const config = {
  siteName: "Akitoshi Lab.",
  siteUrl: "https://akitoshi-lab.com",
  siteDescription: "ロボットが大好きな大学生です．思ったことや日常の出来事をつぶやきます．たまに技術．",
  social: {
    repos: "https://github.com/",
    github: "https://github.com/",
    twitter: "@konoe_akitoshi",
    twitterProf: "https://twitter.com/konoe_akitoshi",
    buyMeACoffee: "https://www.buymeacoffee.com/",
  },
  postListField: 'id,title,description,tag,publishedAt,revisedAt',
  postDetailField: 'id,title,text,description,keywords,thumbnail,tag,tocVisible,useRepeatBody,repeated,related,publishedAt,revisedAt'
};
