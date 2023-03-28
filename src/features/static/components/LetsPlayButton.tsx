import { useAnonSignIn } from "@/features/auth/hooks/useAnonSignIn";
import { AuthContext } from "@/features/auth/providers/auth";
import { useNotification } from "@/shared/hooks/useNotification";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext } from "react";

export const LetsPlayButton = () => {
  const router = useRouter();
  const { notifyError, notifySuccess } = useNotification();
  const { user } = useContext(AuthContext);
  const anonSignInMutation = useAnonSignIn();

  const anonSignIn = async () => {
    try {
      await anonSignInMutation.mutateAsync();
      await router.push("/chats/new");
      notifySuccess({
        message: "ようこそ！お気軽にお試しください",
        options: { autoClose: 5000 },
      });
    } catch (e) {
      notifyError({ message: "エラーが発生しました" });
    }
  };

  const onClickPlay = async () => {
    if (user) {
      await router.push("/chats/new");
    } else {
      await anonSignIn();
    }
  };

  return (
    <Button
      size="md"
      onClick={onClickPlay}
      loading={anonSignInMutation.isLoading}
    >
      試してみる
    </Button>
  );
};
