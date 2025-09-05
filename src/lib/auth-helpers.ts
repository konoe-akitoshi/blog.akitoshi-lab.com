import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { Session } from 'next-auth';

/**
 * 認証が必要なページで使用するカスタムフック
 */
export function useRequireAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // まだロード中

    if (!session) {
      router.replace('/login');
    }
  }, [session, status, router]);

  return {
    session,
    loading: status === 'loading',
    authenticated: !!session,
  };
}

/**
 * 管理者権限が必要なページで使用するカスタムフック
 */
export function useRequireAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // まだロード中

    if (!session) {
      router.replace('/login');
      return;
    }

    if (session.user?.id !== '1') {
      router.replace('/');
    }
  }, [session, status, router]);

  return {
    session,
    loading: status === 'loading',
    authenticated: !!session,
    isAdmin: session?.user?.id === '1',
  };
}

/**
 * セッション情報を安全に取得するヘルパー関数
 */
export function getSessionUser(session: Session | null) {
  if (!session?.user) return null;
  
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  };
}

/**
 * ログアウト処理のヘルパー関数
 */
export async function handleLogout() {
  const { signOut } = await import('next-auth/react');
  await signOut({ 
    redirect: true, 
    callbackUrl: '/login' 
  });
}