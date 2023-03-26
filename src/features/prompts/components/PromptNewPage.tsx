import { PromptForm } from "@/features/prompts/components/PromptForm";
import { Container, Text } from "@mantine/core";

export const PromptNewPage = () => {
  return (
    <Container>
      <Text component="h1" fz="xl">
        メタプロンプト作成
      </Text>
      <PromptForm />
    </Container>
  );
};
