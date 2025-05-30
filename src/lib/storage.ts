import { supabase } from './supabase';

export const storageOperations = {
  // 画像アップロード
  async uploadImage(file: File, path: string) {
    const { error: uploadError, data } = await supabase.storage
      .from('images')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    // 公開URLを取得
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(path);

    return publicUrl;
  },

  // フォルダ内のファイル一覧取得
  async listFiles(folderPath: string) {
    const { data: fileList, error } = await supabase.storage
      .from('images')
      .list(folderPath, { limit: 100 });

    if (error) {
      throw error;
    }

    return fileList || [];
  },

  // フォルダ削除
  async deleteFolder(folderPath: string) {
    const fileList = await this.listFiles(folderPath);
    
    if (fileList.length > 0) {
      const filesToDelete = fileList.map((file) => `${folderPath}/${file.name}`);
      const { error: deleteError } = await supabase.storage
        .from('images')
        .remove(filesToDelete);

      if (deleteError) {
        throw deleteError;
      }
    }
  },
};