import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from '@/types';

/**
 * 認証済みかを確認し、未認証の場合リダイレクトを返す関数
 */
export async function requireAuth(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login', // ログインページへリダイレクト
        permanent: false,
      },
    } as const;
  }

  return { session } as const;
}
