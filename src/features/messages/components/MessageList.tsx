import { Message } from "@/features/messages/types/message";
import { MessageItem } from "@/features/messages/components/MessageItem";
import { Box, Flex, Text } from "@mantine/core";

type Props = {
  messages: Pick<Message, "id" | "role" | "content">[];
  isGenerationg: boolean;
};

export const MessageList = ({ messages, isGenerationg }: Props) => {
  return (
    <Box pb={120}>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {isGenerationg && (
        <Flex justify="center" pt="md">
          <Text color="gray.6" fz="sm">
            生成中...
          </Text>
        </Flex>
      )}
    </Box>
  );
};
