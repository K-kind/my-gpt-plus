import { useCreateAssistantMessage } from "@/features/messages/hooks/useCreateAssistantMessage";
import { useCreateUserMessage } from "@/features/messages/hooks/useCreateUserMessage";
import { Chat } from "@/features/chats/types/chat";
import { Box, Flex, ScrollArea, Text } from "@mantine/core";
import { useCallback, useRef } from "react";
import { MessageList } from "@/features/messages/components/MessageList";
import { useMessageListByChatId } from "@/features/messages/hooks/useMessageList";
import { getModelInfo } from "@/features/chats/models/chat";
import { NewMessageForm } from "@/features/messages/components/NewMessageForm";

type Props = {
  chat: Chat;
  loadingNewMessage?: boolean;
};

export const ChatBoard = ({ chat, loadingNewMessage }: Props) => {
  const messageListByChatIdQuery = useMessageListByChatId({
    chatId: chat.id,
  });

  const viewport = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  const createUserMessageMutation = useCreateUserMessage();
  const createAssistantMessageMutation = useCreateAssistantMessage();

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    viewport.current.scrollTo({
      top: viewport.current.scrollHeight,
      behavior,
    });
  }, []);

  const handleSubmit = useCallback(
    async (content: string, setContent: (content: string) => void) => {
      const userMessage = await createUserMessageMutation.mutateAsync({
        chatId: chat.id,
        content,
      });
      setContent("");
      scrollToBottom("auto");
      // ローディングが表示されるのを待ってから
      setTimeout(scrollToBottom, 100);

      // これまでのmessages + 今の質問messageを作る（この僅かな間にキャッシュが更新されている可能性を吸収）
      const currentMessages = messageListByChatIdQuery.data!;
      const messages = currentMessages.some(({ id }) => id === userMessage.id)
        ? currentMessages
        : [...currentMessages, userMessage];

      await createAssistantMessageMutation.mutateAsync({
        chatId: chat.id,
        model: chat.model,
        messages: messages.map((message) => {
          return { role: message.role, content: message.content };
        }),
      });
      scrollToBottom();
    },
    [
      chat.id,
      chat.model,
      createAssistantMessageMutation,
      createUserMessageMutation,
      messageListByChatIdQuery.data,
      scrollToBottom,
    ]
  );

  return (
    <Box sx={{ position: "relative" }} h="100%">
      <ScrollArea h="calc(100vh - 90px)" viewportRef={viewport}>
        <Flex
          justify="center"
          align="center"
          sx={(theme) => ({
            borderBottom: `1px solid ${theme.colors.gray[4]}`,
          })}
          bg="gray.2"
          py="xs"
        >
          <Text c="gray.7" fz="sm">
            モデル: {getModelInfo(chat).name}
          </Text>
        </Flex>
        <MessageList
          messages={messageListByChatIdQuery.data!}
          loadingNewMessage={
            loadingNewMessage || createAssistantMessageMutation.isLoading
          }
        />
      </ScrollArea>
      <Box sx={{ position: "absolute", bottom: 0 }} w="100%" px="sm" pb="xl">
        <NewMessageForm handleSubmit={handleSubmit} />
      </Box>
    </Box>
  );
};
