import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { AuthContext } from "@/features/auth/providers/auth";
import { useNotification } from "@/shared/hooks/useNotification";
import { NavLink } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useCallback, useContext } from "react";

export const SignOutNavLink = () => {
  const { setUser } = useContext(AuthContext);
  const signOutMutation = useSignOut();
  const { notifyError, notifySuccess } = useNotification();
  const router = useRouter();

  const onClick = useCallback(async () => {
    try {
      await signOutMutation.mutateAsync();
      await router.push("/");
      notifySuccess({ message: "ログアウトしました" });
      setUser(null);
    } catch (e) {
      notifyError();
    }
  }, [notifyError, notifySuccess, router, setUser, signOutMutation]);

  return (
    <NavLink
      label="ログアウト"
      icon={<IconLogout size="1rem" stroke={1.5} />}
      onClick={onClick}
    />
  );
};
