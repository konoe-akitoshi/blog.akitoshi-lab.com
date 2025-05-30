import fs from 'fs/promises';
import path from 'path';

// 画像を保存するディレクトリ
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export const storageOperations = {
  // 画像アップロード
  async uploadImage(file: File, filePath: string) {
    try {
      // アップロードディレクトリを作成（存在しない場合）
      const dir = path.dirname(path.join(UPLOAD_DIR, filePath));
      await fs.mkdir(dir, { recursive: true });

      // ファイルを保存
      const buffer = Buffer.from(await file.arrayBuffer());
      const fullPath = path.join(UPLOAD_DIR, filePath);
      await fs.writeFile(fullPath, buffer);

      // 公開URLを返す
      return `/uploads/${filePath}`;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },

  // フォルダ内のファイル一覧取得
  async listFiles(folderPath: string) {
    try {
      const fullPath = path.join(UPLOAD_DIR, folderPath);
      const files = await fs.readdir(fullPath);
      
      return files.map(name => ({
        name,
        id: name,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        last_accessed_at: new Date().toISOString(),
        metadata: {}
      }));
    } catch (error) {
      // フォルダが存在しない場合は空配列を返す
      if ((error as any).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  },

  // フォルダ削除
  async deleteFolder(folderPath: string) {
    try {
      const fullPath = path.join(UPLOAD_DIR, folderPath);
      await fs.rm(fullPath, { recursive: true, force: true });
    } catch (error) {
      // フォルダが存在しない場合は無視
      if ((error as any).code !== 'ENOENT') {
        throw error;
      }
    }
  },
};