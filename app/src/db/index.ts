import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// データベース接続URLを環境変数から取得
const connectionString = process.env.DATABASE_URL!;

// Postgres.js クライアントを作成
const client = postgres(connectionString, {
  max: 1, // Next.jsのサーバーレス環境用に接続数を制限
});

// Drizzle ORMインスタンスを作成
export const db = drizzle(client, { schema });

// 型エクスポート
export type Database = typeof db;