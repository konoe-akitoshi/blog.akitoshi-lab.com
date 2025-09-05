import NextAuth, { NextAuthOptions } from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { JWT } from 'next-auth/jwt';
import type { Session, User } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials || {};

        if (!username || !password) {
          throw new Error('認証情報が不足しています');
        }

        // 簡易的なユーザー認証 (実際のアプリではDBや外部サービスで検証)
        if (username === 'admin' && password === 'pass') {
          return {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
          } as User;
        }

        // 認証失敗
        throw new Error('認証に失敗しました');
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24時間
    updateAge: 60 * 60, // 1時間
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24時間
  },
  pages: {
    signIn: '/login',
    error: '/login', // エラー時もログインページへ
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
