import { Message } from "@/features/chats/types/message";
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
      <Container py="md" size="sm">
        <Flex gap="md">
          <Avatar radius="xl">{isUser ? <IconUser /> : <IconRobot />}</Avatar>
          <Box sx={{ whiteSpace: "pre-line" }} py={4}>
            {message.content}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
