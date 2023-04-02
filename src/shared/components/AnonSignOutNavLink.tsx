import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { AuthContext } from "@/features/auth/providers/auth";
import { useModal } from "@/shared/hooks/useModal";
import { useNotification } from "@/shared/hooks/useNotification";
import { NavLink } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useCallback, useContext } from "react";

export const AnonSignOutNavLink = () => {
  const { setUser } = useContext(AuthContext);
  const signOutMutation = useSignOut();
  const router = useRouter();
  const { confirm } = useModal();
  const { notifyError, notifySuccess } = useNotification();

  const onClick = useCallback(async () => {
    const message =
      "終了すると、これまでのデータにはアクセスできなくなります。よろしいですか？";
    const confirmed = await confirm({ message });
    if (!confirmed) return;

    try {
      await signOutMutation.mutateAsync();
      notifySuccess({ message: "体験を終了しました" });
      await router.push("/");
      setUser(null);
    } catch (e) {
      notifyError();
    }
  }, [confirm, notifyError, notifySuccess, router, setUser, signOutMutation]);

  return (
    <NavLink
      label="体験を終了"
      icon={<IconLogout size="1rem" stroke={1.5} />}
      onClick={onClick}
    />
  );
};
