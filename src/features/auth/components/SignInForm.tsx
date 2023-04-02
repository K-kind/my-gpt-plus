import { useSignIn } from "@/features/auth/hooks/useSignIn";
import { useNotification } from "@/shared/hooks/useNotification";
import { Button, Card, Flex, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

type FormValues = { email: string; password: string };

export const SignInForm = () => {
  const form = useForm<FormValues>({
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "無効なメールアドレスです",
      password: (value) => (value ? null : "入力してください"),
    },
  });

  const signInMutation = useSignIn();
  const { notifyError, notifySuccess } = useNotification();
  const router = useRouter();

  const handleSubmit = async (formValues: FormValues) => {
    try {
      await signInMutation.mutateAsync(formValues);
      await router.push("/chats/new");
      notifySuccess({ message: "ログインしました" });
    } catch (e) {
      notifyError();
    }
  };

  return (
    <Card w={{ base: 300, sm: 320 }} withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Text weight={400}>ログイン</Text>
      </Card.Section>

      <Card.Section withBorder inheritPadding py="xs">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="メールアドレス"
            mb="lg"
            required
            type="email"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="パスワード"
            mb="lg"
            required
            type="password"
            {...form.getInputProps("password")}
          />

          <Flex justify="center" align="center">
            <Button w="100%" type="submit" loading={signInMutation.isLoading}>
              ログイン
            </Button>
          </Flex>
        </form>
      </Card.Section>
    </Card>
  );
};
