import { useDeleteChat } from "@/features/chats/hooks/useDeleteChat";
import { useNotification } from "@/shared/hooks/useNotification";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback, useState } from "react";

type Props = {
  id: string;
};

export const ChatDeleteButton = ({ id }: Props) => {
  const deleteChatMutation = useDeleteChat();
  const { notifySuccess, notifyError } = useNotification();

  const [isConfirming, setIsConfirming] = useState(false);

  const doDelete = useCallback(async () => {
    try {
      await deleteChatMutation.mutateAsync(id);
      notifySuccess({ message: "チャットを削除しました" });
    } catch (e) {
      notifyError({ message: "削除に失敗しました" });
    }
  }, [deleteChatMutation, id, notifyError, notifySuccess]);

  const startConfirm = useCallback(() => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
    }, 1400);
  }, []);

  if (isConfirming) {
    return (
      <Button
        onClick={doDelete}
        loading={deleteChatMutation.isLoading}
        size="xs"
        color="red"
        variant="subtle"
        py={0}
        px={2}
      >
        OK?
      </Button>
    );
  }

  return (
    <Button
      size="xs"
      color="red"
      variant="subtle"
      onClick={startConfirm}
      px={5.08}
    >
      <IconTrash size="1.125rem" />
    </Button>
  );
};
