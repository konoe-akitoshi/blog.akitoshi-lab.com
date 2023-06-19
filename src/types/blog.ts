/* src/types/blog.ts */
import type { MicroCMSListContent } from "microcms-js-sdk";

export type Tag = {
  name: string;
} & MicroCMSListContent;

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
  content2: {
    richeditor: string;
    html: string;
  };
} & MicroCMSListContent;
