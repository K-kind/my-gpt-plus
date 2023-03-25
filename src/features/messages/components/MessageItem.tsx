import { Message } from "@/features/chats/types/message";
import { MarkdownRenderer } from "@/shared/components/MarkdownRenderer";
import { Avatar, Box, Container, Flex } from "@mantine/core";
import { IconRobot, IconUser } from "@tabler/icons-react";
import { useMemo } from "react";

type Props = {
  message: Message;
};

export const MessageItem = ({ message }: Props) => {
  const isUser = useMemo(() => message.role === "user", [message]);

  return (
    <Box
      sx={(theme) => ({ borderBottom: `1px solid ${theme.colors.gray[4]}` })}
      bg={isUser ? "white" : "gray.2"}
    >
      <Container py="md">
        <Flex gap="md">
          <Avatar radius="xl">{isUser ? <IconUser /> : <IconRobot />}</Avatar>
          <Box py={4} sx={{ flex: 1, width: "calc(100% - 54px)" }}>
            <MarkdownRenderer>{message.content}</MarkdownRenderer>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
