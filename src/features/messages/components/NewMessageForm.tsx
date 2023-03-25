import { Box, Button, Container, Flex, Textarea } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { KeyboardEvent, useCallback, useState } from "react";

type Props = {
  handleSubmit: (
    content: string,
    setContent: (content: string) => void
  ) => void;
};

export const NewMessageForm = ({ handleSubmit }: Props) => {
  const [content, setContent] = useState("");

  const onClick = useCallback(() => {
    handleSubmit(content, setContent);
  }, [content, handleSubmit]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        handleSubmit(content, setContent);
      }
    },
    [content, handleSubmit]
  );

  return (
    <Container size="sm" p={0}>
      <Flex justify="space-between" align="flex-end" gap="xs">
        <Textarea
          value={content}
          autosize
          minRows={2}
          maxRows={6}
          sx={{ flex: 1 }}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button radius="xl" px="xs" onClick={onClick}>
          <IconSend />
        </Button>
      </Flex>
    </Container>
  );
};
