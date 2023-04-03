import { ChatSearchList } from "@/features/chats/components/ChatSearchList";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { Box, Flex, Modal, TextInput, useMantineTheme } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { ChangeEvent, Suspense, useCallback, useEffect, useState } from "react";

type Props = {
  opened: boolean;
  close: () => void;
};

export const ChatSearchModal = ({ opened, close }: Props) => {
  const theme = useMantineTheme();
  const [word, setWord] = useState("");
  // ユーザーの入力がひと段落したword
  const [fixedWord, setFixedWord] = useState("");

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.currentTarget.value);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFixedWord(word);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [word]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      size={560}
      overlayProps={{
        color: theme.colors.gray[4],
        opacity: 0.55,
        blur: 3,
      }}
      transitionProps={{ transition: "slide-down" }}
      withCloseButton={false}
    >
      <TextInput
        value={word}
        onChange={onChange}
        placeholder="検索"
        mb="xs"
        icon={<IconSearch size="0.8rem" />}
      />

      <Box mih={400}>
        {!!word && (
          <Suspense fallback={<ContentLoader height={400} />}>
            <ChatSearchList word={fixedWord} />
          </Suspense>
        )}
      </Box>
    </Modal>
  );
};
