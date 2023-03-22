import { useCreateAssistantMessage } from "@/features/messages/hooks/useCreateAssistantMessage";
import { useCreateUserMessage } from "@/features/messages/hooks/useCreateUserMessage";
import { Chat } from "@/features/chats/types/chat";
import { Button, Textarea } from "@mantine/core";
import { useState } from "react";
import { MessageList } from "@/features/messages/components/MessageList";
import { useMessageListByChatId } from "@/features/messages/hooks/useMessageList";

type Props = {
  chat: Chat;
  loadingNewMessage?: boolean;
};

export const ChatBoard = ({ chat, loadingNewMessage }: Props) => {
  const [content, setContent] = useState("");
  const messageListByChatIdQuery = useMessageListByChatId({
    chatId: chat.id,
  });

  const createUserMessageMutation = useCreateUserMessage();
  const createAssistantMessageMutation = useCreateAssistantMessage();

  const handleSubmit = async () => {
    const userMessage = await createUserMessageMutation.mutateAsync({
      chatId: chat.id,
      content,
    });
    setContent("");

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
  };

  return (
    <div>
      <MessageList
        messages={messageListByChatIdQuery.data!}
        loadingNewMessage={
          loadingNewMessage || createAssistantMessageMutation.isLoading
        }
      />
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <Button onClick={handleSubmit}>送信</Button>
    </div>
  );
};
