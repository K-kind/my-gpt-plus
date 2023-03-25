import { ChatList } from "@/features/chats/components/ChatList";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { Box, Container, Text } from "@mantine/core";
import { Suspense } from "react";

export const ChatIndexPage = () => {
  return (
    <Container>
      <Text component="h1" fz="xl">
        チャット履歴
      </Text>
      <Suspense fallback={<ContentLoader />}>
        <ChatList />
      </Suspense>
    </Container>
  );
};
