import { useCreateAssistantMessage } from "@/features/messages/hooks/useCreateAssistantMessage";
import { useCreateUserMessage } from "@/features/messages/hooks/useCreateUserMessage";
import { Chat } from "@/features/chats/types/chat";
import { Button, Textarea } from "@mantine/core";
import { useState } from "react";
import { MessageList } from "@/features/messages/components/MessageList";

type Props = {
  chat: Chat;
  loadingNewMessage?: boolean;
};

export const ChatBoard = ({ chat, loadingNewMessage }: Props) => {
  const [content, setContent] = useState("");
  const createUserMessageMutation = useCreateUserMessage();
  const createAssistantMessageMutation = useCreateAssistantMessage();
  const handleSubmit = async () => {};

  return (
    <div>
      <MessageList
        chat={chat}
        loadingNewMessage={
          loadingNewMessage || createAssistantMessageMutation.isLoading
        }
      />
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <Button onClick={handleSubmit}>送信</Button>
    </div>
  );
};
