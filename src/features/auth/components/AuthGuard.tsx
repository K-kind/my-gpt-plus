import { AuthContext } from "@/features/auth/providers/auth";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const AUTHORIZED_PATHS = ["/chats", "/chats/[id]", "/chats/new"] as const;

export const AuthGuard = ({ children }: Props) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) return;
    if (!(AUTHORIZED_PATHS as ReadonlyArray<string>).includes(router.asPath))
      return;

    router.push("/");
  }, [router, user]);

  if (user == null) return null;

  return <>{children}</>;
};
