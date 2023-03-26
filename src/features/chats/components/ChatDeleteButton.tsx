import { useDeleteChat } from "@/features/chats/hooks/useDeleteChat";
import { useNotification } from "@/shared/hooks/useNotification";
import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

type Props = {
  id: string;
};

export const ChatDeleteButton = ({ id }: Props) => {
  const deleteChatMutation = useDeleteChat();
  const { notifySuccess, notifyError } = useNotification();

  const onClickDelete = async () => {
    try {
      await deleteChatMutation.mutateAsync(id);
      notifySuccess({ message: "チャットを削除しました" });
    } catch (e) {
      notifyError({ message: "削除に失敗しました" });
    }
  };

  return (
    <ActionIcon onClick={onClickDelete} loading={deleteChatMutation.isLoading}>
      <IconTrash size="1.125rem" color="red" />
    </ActionIcon>
  );
};
