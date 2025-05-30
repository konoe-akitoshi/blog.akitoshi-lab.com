-- 拡張機能を有効化
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- データベースの文字エンコーディングを確認
SHOW server_encoding;

-- タイムゾーンを設定
SET timezone = 'Asia/Tokyo';

-- 初期設定完了メッセージ
DO $$
BEGIN
    RAISE NOTICE 'PostgreSQL initialization completed successfully!';
END $$;