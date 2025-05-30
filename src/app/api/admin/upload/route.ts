import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

// 画像を保存するディレクトリ
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function POST(request: NextRequest) {
  try {
    // 認証チェック
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const filePath = formData.get('path') as string;

    if (!file || !filePath) {
      return NextResponse.json({ error: 'File and path are required' }, { status: 400 });
    }

    // アップロードディレクトリを作成（存在しない場合）
    const dir = path.dirname(path.join(UPLOAD_DIR, filePath));
    await fs.mkdir(dir, { recursive: true });

    // ファイルを保存
    const buffer = Buffer.from(await file.arrayBuffer());
    const fullPath = path.join(UPLOAD_DIR, filePath);
    await fs.writeFile(fullPath, buffer);

    // 公開URLを返す
    const publicUrl = `/uploads/${filePath}`;
    
    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // 認証チェック
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const folderPath = searchParams.get('path');

    if (!folderPath) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    const fullPath = path.join(UPLOAD_DIR, folderPath);
    await fs.rm(fullPath, { recursive: true, force: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}