import { useMessageListByChatId } from "@/features/messages/hooks/useMessageList";
import { Chat } from "@/features/chats/types/chat";

type Props = {
  chat: Chat;
  loadingNewMessage: boolean;
};

export const MessageList = ({ chat, loadingNewMessage }: Props) => {
  const messageListByChatIdQuery = useMessageListByChatId({
    chatId: chat.id,
  });
  const messages = messageListByChatIdQuery.data!;

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>{JSON.stringify(message)}</div>
      ))}
      {loadingNewMessage ? <p>ロード中...</p> : null}
    </div>
  );
};
