import {
  FormValues,
  PromptForm,
} from "@/features/prompts/components/PromptForm";
import { useCreatePrompt } from "@/features/prompts/hooks/useCreatePrompt";
import { useNotification } from "@/shared/hooks/useNotification";
import { Container, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const PromptNewPage = () => {
  const router = useRouter();
  const { notifyError, notifySuccess } = useNotification();
  const createPromptMutation = useCreatePrompt();

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      try {
        await createPromptMutation.mutateAsync(formValues);
        notifySuccess({ message: "保存しました" });
        await router.push("/prompts");
      } catch (e) {
        notifyError({ message: "保存に失敗しました" });
      }
    },
    [createPromptMutation, notifyError, notifySuccess, router]
  );

  return (
    <Container>
      <Text component="h1" fz="xl">
        事前指示作成
      </Text>
      <PromptForm
        handleSubmit={handleSubmit}
        isLoading={createPromptMutation.isLoading}
      />
    </Container>
  );
};
