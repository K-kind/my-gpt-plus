import {
  FormValues,
  PromptForm,
} from "@/features/prompts/components/PromptForm";
import { PromptHelpMark } from "@/features/prompts/components/PromptHelpMark";
import { useCreatePrompt } from "@/features/prompts/hooks/useCreatePrompt";
import { useNotification } from "@/shared/hooks/useNotification";
import { Container, Flex, Text } from "@mantine/core";
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
      <Flex align="center">
        <Text component="h1" fz="xl" mr="xs">
          事前指示作成
        </Text>
        <PromptHelpMark />
      </Flex>
      <PromptForm
        handleSubmit={handleSubmit}
        isLoading={createPromptMutation.isLoading}
      />
    </Container>
  );
};
