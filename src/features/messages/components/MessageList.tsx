import { Message } from "@/features/chats/types/message";
import { MessageItem } from "@/features/messages/components/MessageItem";

type Props = {
  messages: Message[];
  loadingNewMessage: boolean;
};

export const MessageList = ({ messages, loadingNewMessage }: Props) => {
  return (
    <div>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {loadingNewMessage ? <p>ロード中...</p> : null}
    </div>
  );
};
