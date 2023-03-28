import { useUpdatePrompt } from "@/features/prompts/hooks/useUpdatePrompt";
import { Prompt } from "@/features/prompts/types/prompt";
import { useNotification } from "@/shared/hooks/useNotification";
import { Checkbox } from "@mantine/core";
import { useCallback } from "react";

type Props = {
  prompt: Prompt;
};

export const PromptDefaultCheck = ({ prompt }: Props) => {
  const { notifyError, notifySuccess } = useNotification();
  const updatePromptMutation = useUpdatePrompt({ id: prompt.id });

  const handleChange = useCallback(async () => {
    try {
      await updatePromptMutation.mutateAsync({ isDefault: !prompt.isDefault });
      notifySuccess({ message: "保存しました" });
    } catch (e) {
      notifyError({ message: "保存に失敗しました" });
    }
  }, [notifyError, notifySuccess, prompt.isDefault, updatePromptMutation]);
  return (
    <Checkbox
      checked={prompt.isDefault}
      onChange={handleChange}
      styles={{ input: { cursor: "pointer" } }}
    />
  );
};
