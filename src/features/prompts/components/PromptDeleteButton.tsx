import { useDeleteChat } from "@/features/chats/hooks/useDeleteChat";
import { useDeletePrompt } from "@/features/prompts/hooks/useDeletePrompt";
import { Prompt } from "@/features/prompts/types/prompt";
import { useNotification } from "@/shared/hooks/useNotification";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback, useState } from "react";

type Props = {
  prompt: Prompt;
  prompts: Prompt[];
};

export const PromptDeleteButton = ({ prompt, prompts }: Props) => {
  const deletePromptMutation = useDeletePrompt({ prompt, prompts });
  const { notifySuccess, notifyError } = useNotification();

  const [isConfirming, setIsConfirming] = useState(false);

  const doDelete = useCallback(async () => {
    try {
      await deletePromptMutation.mutateAsync();
      notifySuccess({ message: "プロンプトを削除しました" });
    } catch (e) {
      notifyError({ message: "削除に失敗しました" });
    }
  }, [deletePromptMutation, notifyError, notifySuccess]);

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
        loading={deletePromptMutation.isLoading}
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
