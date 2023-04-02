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

const GUEST_PATHS = ["/signin"] as const;

export const AuthGuard = ({ children }: Props) => {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  const isAuthorizedPath = useMemo(
    () => (AUTHORIZED_PATHS as ReadonlyArray<string>).includes(router.asPath),
    [router.asPath]
  );

  const isGuestPath = useMemo(
    () => (GUEST_PATHS as ReadonlyArray<string>).includes(router.asPath),
    [router.asPath]
  );

  // ユーザー初期化 + 最初だけredirect制御
  useEffect(() => {
    getUser().then((u) => {
      setUser(u);
      if (u == null && isAuthorizedPath) {
        return router.push("/signin");
      }
      if (u != null && isGuestPath) {
        return router.push("/chats/new");
      }
    });
    // 最初だけ行うため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser]);

  if (user === undefined) return null;
  if (isAuthorizedPath && user == null) return null;

  return <>{children}</>;
};
