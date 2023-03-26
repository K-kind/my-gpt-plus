import { useCreatePrompt } from "@/features/prompts/hooks/useCreatePrompt";
import { Prompt } from "@/features/prompts/types/prompt";
import { useNotification } from "@/shared/hooks/useNotification";
import { Button, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useCallback } from "react";

type FormValues = { title: string; content: string };

type Props = {
  prompt?: Prompt;
};

export const PromptForm = ({ prompt }: Props) => {
  const router = useRouter();
  const { notifyError, notifySuccess } = useNotification();

  const form = useForm<FormValues>({
    initialValues: {
      title: prompt?.title ?? "",
      content: prompt?.content ?? "",
    },
    validate: {
      title: (value) => {
        if (!value) return "入力してください";
        if (value.length > 30) return "30文字以内で入力してください";
        return null;
      },
      content: (value) => (value ? null : "入力してください"),
    },
  });

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
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="タイトル"
        required
        maw={400}
        mb="lg"
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        {...form.getInputProps("title")}
      />

      <Textarea
        w="100%"
        label="内容"
        autosize
        minRows={2}
        maxRows={6}
        required
        mb="lg"
        {...form.getInputProps("content")}
      />

      <Button type="submit" loading={createPromptMutation.isLoading}>
        保存
      </Button>
    </form>
  );
};
