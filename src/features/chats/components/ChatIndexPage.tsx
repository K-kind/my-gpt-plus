import { ChatList } from "@/features/chats/components/ChatList";
import { ChatSearchButton } from "@/features/chats/components/ChatSearchButton";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { Container, Flex, Text } from "@mantine/core";
import { Suspense } from "react";

export const ChatIndexPage = () => {
  return (
    <Container>
      <Text component="h1" fz="xl">
        チャット履歴
      </Text>

      <Flex justify="center" mb="lg">
        <ChatSearchButton />
      </Flex>

      <Suspense fallback={<ContentLoader />}>
        <ChatList />
      </Suspense>
    </Container>
  );
};
