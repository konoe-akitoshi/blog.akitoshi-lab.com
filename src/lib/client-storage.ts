// クライアントサイドで使用するストレージ操作

export const clientStorageOperations = {
  // 画像アップロード
  async uploadImage(file: File, path: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.url;
  },

  // フォルダ削除
  async deleteFolder(folderPath: string) {
    const response = await fetch(`/api/admin/upload?path=${encodeURIComponent(folderPath)}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }
  },
};