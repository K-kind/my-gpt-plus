import {
  FormValues,
  PromptForm,
} from "@/features/prompts/components/PromptForm";
import { usePrompt } from "@/features/prompts/hooks/usePrompt";
import { useUpdatePrompt } from "@/features/prompts/hooks/useUpdatePrompt";
import { useNotification } from "@/shared/hooks/useNotification";
import { Container, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const PromptEditPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const promptQuery = usePrompt({ id });

  const { notifyError, notifySuccess } = useNotification();
  const updatePromptMutation = useUpdatePrompt({ id });

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      try {
        await updatePromptMutation.mutateAsync(formValues);
        notifySuccess({ message: "保存しました" });
        await router.push("/prompts");
      } catch (e) {
        notifyError({ message: "保存に失敗しました" });
      }
    },
    [updatePromptMutation, notifyError, notifySuccess, router]
  );

  return (
    <Container>
      <Text component="h1" fz="xl">
        メタプロンプト編集
      </Text>
      <PromptForm
        prompt={promptQuery.data!}
        handleSubmit={handleSubmit}
        isLoading={updatePromptMutation.isLoading}
      />
    </Container>
  );
};
