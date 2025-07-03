import { AppProps as NextAppProps } from 'next/app';
import { GetServerSidePropsContext as NextGetServerSidePropsContext } from 'next';

export interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  thumbnail?: string;
  tags?: string[];
  slug?: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
}

export interface TOCItem {
  id: string;
  text: string | null;
  level: number;
}

export type AppProps = NextAppProps & {
  pageProps: {
    session?: unknown;
  };
};

export type GetServerSidePropsContext = NextGetServerSidePropsContext;