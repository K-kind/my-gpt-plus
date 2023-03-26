import { useDeleteChat } from "@/features/chats/hooks/useDeleteChat";
import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

type Props = {
  id: string;
};

export const ChatDeleteButton = ({ id }: Props) => {
  const deleteChatMutation = useDeleteChat();

  const onClickDelete = async () => {
    await deleteChatMutation.mutateAsync(id);
  };

  return (
    <ActionIcon onClick={onClickDelete} loading={deleteChatMutation.isLoading}>
      <IconTrash size="1.125rem" color="red" />
    </ActionIcon>
  );
};
