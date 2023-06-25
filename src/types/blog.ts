/* src/types/blog.ts */
import type { MicroCMSListContent, MicroCMSListResponse } from "microcms-js-sdk";

export type Tag = {
  name: string;
  sortOrder: number;
} & MicroCMSListContent;
export type TagList = MicroCMSListResponse<Tag>

export type Post = {
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  title: string;
  tag: Tag[];
  date: string;
  content: string;
  content2: string;
} & MicroCMSListContent;
export type PostList = MicroCMSListResponse<Post>