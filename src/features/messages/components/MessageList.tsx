import { Message } from "@/features/messages/types/message";
import { MessageItem } from "@/features/messages/components/MessageItem";
import { Box, Flex, Text } from "@mantine/core";

type Props = {
  messages: Pick<Message, "id" | "role" | "content">[];
  isGenerationg: boolean;
};

export const MessageList = ({ messages, isGenerationg }: Props) => {
  return (
    <Box pb={100} sx={{ position: "relative" }}>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {isGenerationg && (
        <Box
          pt="md"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Text color="gray.6" fz="sm">
            生成中...
          </Text>
        </Box>
      )}
    </Box>
  );
};
