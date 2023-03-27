import { PromptHelpMark } from "@/features/prompts/components/PromptHelpMark";
import { PromptList } from "@/features/prompts/components/PromptList";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { Container, Flex, Text } from "@mantine/core";
import { Suspense } from "react";

export const PromptIndexPage = () => {
  return (
    <Container>
      <Flex align="center">
        <Text component="h1" fz="xl" mr="xs">
          事前指示管理
        </Text>
        <PromptHelpMark />
      </Flex>
      <Suspense fallback={<ContentLoader />}>
        <PromptList />
      </Suspense>
    </Container>
  );
};
