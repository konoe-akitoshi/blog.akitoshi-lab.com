import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect, FormEvent } from "react";

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      router.push("/admin");
    }
  }, [session, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError("ユーザー名またはパスワードが正しくありません。");
    } else {
      router.push("/admin");
    }
  };

  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <main className="w-full max-w-sm px-6">
          <h1 className="mb-6 text-2xl font-semibold text-gray-900">ログイン</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                ユーザー名
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="ユーザー名"
                autoComplete="username"
                required
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="パスワード"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-gray-900 py-2 text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:ring-offset-2"
            >
              ログイン
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default LoginPage;
