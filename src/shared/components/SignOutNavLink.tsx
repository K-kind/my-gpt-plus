import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { useNotification } from "@/shared/hooks/useNotification";
import { NavLink } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useCallback } from "react";

export const SignOutNavLink = () => {
  const signOutMutation = useSignOut();
  const { notifyError, notifySuccess } = useNotification();

  const onClick = useCallback(async () => {
    try {
      await signOutMutation.mutateAsync();
      notifySuccess({ message: "ログアウトしました" });
      // NOTE: AuthGuardによってリダイレクトされる
    } catch (e) {
      notifyError();
    }
  }, [notifyError, notifySuccess, signOutMutation]);

  return (
    <NavLink
      label="ログアウト"
      icon={<IconLogout size="1rem" stroke={1.5} />}
      onClick={onClick}
    />
  );
};
