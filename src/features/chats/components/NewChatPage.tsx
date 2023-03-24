import { ChatBoard } from "@/features/chats/components/ChatBoard";
import { useCreateAssistantMessage } from "@/features/messages/hooks/useCreateAssistantMessage";
import { useCreateChat } from "@/features/chats/hooks/useCreateChat";
import { useCreateUserMessage } from "@/features/messages/hooks/useCreateUserMessage";
import { Chat } from "@/features/chats/types/chat";
import { Button, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Props = {};

export const NewChatPage = ({}: Props) => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [chat, setChat] = useState<Chat | null>(null);

  const createChatMutation = useCreateChat();
  const createUserMessageMutation = useCreateUserMessage();
  const createAssistantMessageMutation = useCreateAssistantMessage();

  useEffect(() => {
    if (router.query.id == undefined) {
      setChat(null);
    }
  }, [router.query]);

  const handleSubmit = async () => {
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
  };

  if (chat) {
    return (
      <ChatBoard
        chat={chat}
        loadingNewMessage={createAssistantMessageMutation.isLoading}
      />
    );
  } else {
    return (
      <div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleSubmit}>送信</Button>
      </div>
    );
  }
};
