import { Prompt } from "@/features/prompts/types/prompt";
import { Button, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export type FormValues = { title: string; content: string };

type Props = {
  prompt?: Prompt;
  handleSubmit: (formValues: FormValues) => void;
  isLoading: boolean;
};

export const PromptForm = ({ prompt, handleSubmit, isLoading }: Props) => {
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

      <Button type="submit" loading={isLoading}>
        保存
      </Button>
    </form>
  );
};
