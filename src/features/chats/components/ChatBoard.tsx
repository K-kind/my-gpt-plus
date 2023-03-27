import { Chat } from "@/features/chats/types/chat";
import { Badge, Box, Flex, ScrollArea, Text } from "@mantine/core";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { MessageList } from "@/features/messages/components/MessageList";
import { useMessageListByChatId } from "@/features/messages/hooks/useMessageList";
import { getModelInfo } from "@/features/chats/models/chat";
import { NewMessageForm } from "@/features/messages/components/NewMessageForm";
import { useStreamChatCompletion } from "@/features/completion/hooks/useStreamChatCompletion";
import { useCreateMessage } from "@/features/messages/hooks/useCreateMessage";
import { Message } from "@/features/messages/types/message";

export type ChatBoardHandle = {
  handleSubmit: (
    content: string,
    setContent: (content: string) => void
  ) => Promise<void>;
};

type Props = {
  chat: Chat;
};

const ChatBoard = forwardRef<ChatBoardHandle, Props>(({ chat }: Props, ref) => {
  const messageListByChatIdQuery = useMessageListByChatId({
    chatId: chat.id,
  });

  const viewport = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  const createMessageMutation = useCreateMessage();
  const streamChatCompletionMutation = useStreamChatCompletion();

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    viewport.current.scrollTo({
      top: viewport.current.scrollHeight,
      behavior,
    });
  }, []);

  const handleSubmit = useCallback(
    async (content: string, setContent: (content: string) => void) => {
      const userMessage = await createMessageMutation.mutateAsync({
        chatId: chat.id,
        role: "user",
        content,
      });
      setContent("");
      scrollToBottom();

      const promptMessages = chat.prompts.map((prompt) => {
        return { role: "system", content: prompt.content } as const;
      });
      // これまでのmessages + 今の質問messageを作る（この僅かな間にキャッシュが更新されている可能性を吸収）
      const currentMessages = messageListByChatIdQuery.data!;
      const messages = currentMessages.some(({ id }) => id === userMessage.id)
        ? currentMessages
        : [...currentMessages, userMessage];

      await streamChatCompletionMutation.start({
        params: {
          model: chat.model,
          messages: [
            ...promptMessages,
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
        },
        onSuccess: async (content) => {
          await createMessageMutation.mutateAsync({
            chatId: chat.id,
            role: "assistant",
            content,
          });
          streamChatCompletionMutation.setContent(undefined);
        },
      });
    },
    [
      chat.id,
      chat.model,
      chat.prompts,
      createMessageMutation,
      messageListByChatIdQuery.data,
      scrollToBottom,
      streamChatCompletionMutation,
    ]
  );

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  const messages = useMemo<Pick<Message, "id" | "role" | "content">[]>(() => {
    const persistedMessages = messageListByChatIdQuery.data!;
    if (streamChatCompletionMutation.content == undefined) {
      return persistedMessages;
    }
    if (persistedMessages[0]?.role === "user") {
      return [
        ...persistedMessages,
        {
          id: "new",
          role: "assistant",
          content: streamChatCompletionMutation.content,
        },
      ];
    }
    return persistedMessages;
  }, [messageListByChatIdQuery.data, streamChatCompletionMutation.content]);

  return (
    <Box sx={{ position: "relative" }} h="100%">
      <ScrollArea h="calc(100vh - 98px)" viewportRef={viewport}>
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
          {chat.prompts.length > 0 && (
            <Flex align="center" ml="xs" gap="xs" wrap="wrap">
              {chat.prompts.map((prompt) => (
                <Badge key={prompt.id} size="lg" variant="outline">
                  {prompt.title}
                </Badge>
              ))}
            </Flex>
          )}
        </Flex>
        <MessageList
          messages={messages}
          isGenerationg={streamChatCompletionMutation.isLoading}
        />
      </ScrollArea>
      <Box sx={{ position: "absolute", bottom: 0 }} w="100%" px="sm" py="md">
        <NewMessageForm handleSubmit={handleSubmit} />
      </Box>
    </Box>
  );
});

ChatBoard.displayName = "ChatBoard";

export { ChatBoard };
