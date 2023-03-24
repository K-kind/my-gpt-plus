import { Message } from "@/features/chats/types/message";
import { MessageItem } from "@/features/messages/components/MessageItem";
import { RandomLoader } from "@/shared/components/loaders/RandomLoader";
import { Flex } from "@mantine/core";

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
      {loadingNewMessage && (
        <Flex justify="center" py="xs" bg="gray.2">
          <RandomLoader />
        </Flex>
      )}
    </div>
  );
};
