import { PromptList } from "@/features/prompts/components/PromptList";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { Container, Text } from "@mantine/core";
import { Suspense } from "react";

export const PromptIndexPage = () => {
  return (
    <Container>
      <Text component="h1" fz="xl">
        メタプロンプト管理
      </Text>
      <Suspense fallback={<ContentLoader />}>
        <PromptList />
      </Suspense>
    </Container>
  );
};
