// client/server/api/postList.ts
import type { IncomingMessage, ServerResponse } from "http";
import client from "./client.ts";
import { Post } from "./types.ts";

export default async (req: IncomingMessage, res: ServerResponse) => {
  const queries = {
    fields: "id,title,publishedAt,tag",
  };

  const data = client.getList<Post>({
    endpoint: "blog",
    queries: queries,
  });

  return data;
};
