import { Button, Container, Flex, Textarea } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { KeyboardEvent, useCallback, useState } from "react";

type Props = {
  handleSubmit: (
    content: string,
    setContent: (content: string) => void
  ) => Promise<void>;
  isOverMax?: boolean;
  isGenerationg?: boolean;
};

export const NewMessageForm = ({
  handleSubmit,
  isOverMax,
  isGenerationg,
}: Props) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitIsDisabled = !content || isOverMax || isLoading || isGenerationg;

  const onClick = useCallback(() => {
    setIsLoading(true);
    handleSubmit(content, setContent).finally(() => {
      setIsLoading(false);
    });
  }, [content, handleSubmit]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        if (submitIsDisabled) return;

        setIsLoading(true);
        handleSubmit(content, setContent).finally(() => {
          setIsLoading(false);
        });
      }
    },
    [content, handleSubmit, submitIsDisabled]
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
          disabled={isOverMax}
          placeholder={
            isOverMax ? "これ以上は質問できません" : "質問してください"
          }
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button
          radius="xl"
          px="xs"
          onClick={onClick}
          disabled={submitIsDisabled}
        >
          <IconSend />
        </Button>
      </Flex>
    </Container>
  );
};
