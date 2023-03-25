import { ChatBoard } from "@/features/chats/components/ChatBoard";
import { useCreateAssistantMessage } from "@/features/messages/hooks/useCreateAssistantMessage";
import { useCreateChat } from "@/features/chats/hooks/useCreateChat";
import { useCreateUserMessage } from "@/features/messages/hooks/useCreateUserMessage";
import { Chat } from "@/features/chats/types/chat";
import { Box } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NewMessageForm } from "@/features/messages/components/NewMessageForm";

type Props = {};

export const NewChatPage = ({}: Props) => {
  const router = useRouter();
  const [chat, setChat] = useState<Chat | null>(null);

  const createChatMutation = useCreateChat();
  const createUserMessageMutation = useCreateUserMessage();
  const createAssistantMessageMutation = useCreateAssistantMessage();

  useEffect(() => {
    if (router.query.id == undefined) {
      setChat(null);
    }
  }, [router.query]);

  const handleSubmit = useCallback(
    async (content: string, setContent: (content: string) => void) => {
      const newChat = await createChatMutation.mutateAsync({
        userId: "sample",
        model: "gpt-3.5-turbo",
        systemContent: null,
        initialContent: content,
      });
      setChat(newChat);
      setContent("");

      router.push(`?id=${newChat.id}`);

      const userMessage = await createUserMessageMutation.mutateAsync({
        chatId: newChat.id,
        content,
      });

      await createAssistantMessageMutation.mutateAsync({
        chatId: newChat.id,
        model: newChat.model,
        messages: [{ role: userMessage.role, content: userMessage.content }],
      });

      // ?id=のままだとリロード時におかしな挙動になるため、URLだけ密かに変える
      history.replaceState(undefined, "", `/chats/${newChat.id}`);
    },
    [
      createAssistantMessageMutation,
      createChatMutation,
      createUserMessageMutation,
      router,
    ]
  );

  if (chat) {
    return (
      <ChatBoard
        chat={chat}
        loadingNewMessage={createAssistantMessageMutation.isLoading}
      />
    );
  } else {
    return (
      <Box sx={{ position: "relative" }} h="100%">
        {/* <Box p="sm">
          <NewMessageForm handleSubmit={handleSubmit} />
        </Box> */}
        <Box sx={{ position: "absolute", bottom: 0 }} w="100%" px="sm" pb="xl">
          <NewMessageForm handleSubmit={handleSubmit} />
        </Box>
      </Box>
    );
  }
};
