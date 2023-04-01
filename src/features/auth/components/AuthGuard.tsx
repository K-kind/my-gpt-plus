import { getUser } from "@/features/auth/api/getUser";
import { AuthContext } from "@/features/auth/providers/auth";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useMemo } from "react";

type Props = {
  children: ReactNode;
};

const AUTHORIZED_PATHS = [
  "/chats",
  "/chats/[id]",
  "/chats/new",
  "/signup",
] as const;

export const AuthGuard = ({ children }: Props) => {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  const isAuthorizedPath = useMemo(
    () => (AUTHORIZED_PATHS as ReadonlyArray<string>).includes(router.asPath),
    [router.asPath]
  );

  // ユーザー初期化
  useEffect(() => {
    getUser().then((u) => setUser(u));
  }, [setUser]);

  // ログイン必須パスのredirect制御
  useEffect(() => {
    if (user !== null) return;
    if (!isAuthorizedPath) return;

    router.push("/");
  }, [isAuthorizedPath, router, user]);

  if (user === undefined) return null;
  if (isAuthorizedPath && user == null) return null;

  return <>{children}</>;
};
