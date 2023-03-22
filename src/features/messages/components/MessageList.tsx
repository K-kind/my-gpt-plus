import { Message } from "@/features/chats/types/message";

type Props = {
  messages: Message[];
  loadingNewMessage: boolean;
};

export const MessageList = ({ messages, loadingNewMessage }: Props) => {
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} style={{ whiteSpace: "pre-line" }}>
          {JSON.stringify(
            {
              id: message.id,
              role: message.role,
              content: message.content,
              createdAt: message.createdAt,
            },
            null,
            2
          )}
        </div>
      ))}
      {loadingNewMessage ? <p>ロード中...</p> : null}
    </div>
  );
};
