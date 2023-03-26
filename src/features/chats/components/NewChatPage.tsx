import { ChatBoard } from "@/features/chats/components/ChatBoard";
import { useCreateAssistantMessage } from "@/features/messages/hooks/useCreateAssistantMessage";
import { useCreateChat } from "@/features/chats/hooks/useCreateChat";
import { useCreateUserMessage } from "@/features/messages/hooks/useCreateUserMessage";
import { Chat } from "@/features/chats/types/chat";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  HandleSubmitParams,
  NewChatForm,
} from "@/features/chats/components/NewChatForm";

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
    async ({ model, prompts, content, setContent }: HandleSubmitParams) => {
      const newChat = await createChatMutation.mutateAsync({
        model,
        prompts,
        initialContent: content,
      });
      setChat(newChat);
      setContent("");

      router.push(`?id=${newChat.id}`);

      const userMessage = await createUserMessageMutation.mutateAsync({
        chatId: newChat.id,
        content,
      });

      const systemMessages = prompts.map<{ role: "system"; content: string }>(
        (prompt) => ({ role: "system", content: prompt.content })
      );

      await createAssistantMessageMutation.mutateAsync({
        chatId: newChat.id,
        model: newChat.model,
        messages: [
          ...systemMessages,
          { role: userMessage.role, content: userMessage.content },
        ],
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
    return <NewChatForm handleSubmit={handleSubmit} />;
  }
};
