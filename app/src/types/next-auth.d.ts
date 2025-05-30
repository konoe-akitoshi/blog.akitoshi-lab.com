import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * セッションオブジェクトの型を拡張
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }

  /**
   * ユーザーオブジェクトの型を拡張
   */
  interface User {
    id: string;
  }
}

declare module 'next-auth/jwt' {
  /**
   * JWTトークンの型を拡張
   */
  interface JWT {
    id: string;
  }
}
