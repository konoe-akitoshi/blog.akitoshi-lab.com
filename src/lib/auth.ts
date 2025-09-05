import { getServerSession } from 'next-auth/next';
import { GetServerSidePropsContext } from '@/types';
import type { Session } from 'next-auth';

interface AuthResult {
  redirect?: {
    destination: string;
    permanent: boolean;
  };
  session?: Session;
}

/**
 * 認証済みかを確認し、未認証の場合リダイレクトを返す関数
 * authOptionsは使用する場所でimportして渡してください
 */
export async function requireAuth(
  context: GetServerSidePropsContext,
  authOptions: import('next-auth').NextAuthOptions
): Promise<AuthResult> {
  try {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return { session };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

/**
 * クライアントサイドでセッションをチェックする関数
 */
export function isAuthenticated(session: Session | null): boolean {
  return !!session?.user;
}

/**
 * 管理者権限をチェックする関数
 */
export function isAdmin(session: Session | null): boolean {
  return session?.user?.id === '1';
}
