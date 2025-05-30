import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// 保護されたルート
const protectedRoutes = ['/admin', '/admin/create', '/admin/edit'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 管理者ページへのアクセスをチェック
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    // 認証されていない場合、ログインページにリダイレクト
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
