// src/lib/auth.js
import { getSession } from 'next-auth/react';

/**
 * 認証済みかを確認し、未認証の場合リダイレクトを返す関数
 * @param {Object} context - Next.jsの`context`オブジェクト
 * @returns {Object} 認証状態に応じたレスポンスオブジェクト
 */
export async function requireAuth(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login', // ログインページへリダイレクト
        permanent: false,
      },
    };
  }

  return { session };
}
