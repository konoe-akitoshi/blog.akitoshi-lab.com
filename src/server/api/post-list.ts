import client from "./client";
import { Post } from "../../types/blog";
import NodeCache from "node-cache";

// キャッシュのインスタンスを作成（TTLは60秒）
const cache = new NodeCache({ stdTTL: 60 });

export default defineEventHandler(async (event) => {
  const queries: MicroCMSQueries = getQuery(event);

  // キャッシュキーを生成（クエリパラメータを含める）
  const cacheKey = `post-list-${JSON.stringify(queries)}`;

  // キャッシュからデータを試みる
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    // キャッシュがない場合はAPIを呼び出す
    const data = await client.getList<Post>({
      endpoint: "post",
      queries: queries,
    });

    // データをキャッシュに保存
    if (data) {
      cache.set(cacheKey, data);
    }

    return data;
  } catch (err) {
    console.error(err);
    // エラー時は適切なレスポンスを返す
    return { error: "API request failed", details: err };
  }
});