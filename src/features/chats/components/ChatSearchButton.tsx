import { ChatSearchModal } from "@/features/chats/components/ChatSearchModal";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";

export const ChatSearchButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        leftIcon={<IconSearch size="1rem" />}
        variant="outline"
        size="sm"
        fz={14}
        fw="normal"
        h={32}
        c="gray.5"
        color="gray.4"
        w="172px"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        styles={{
          root: {
            "&:active": {
              transform: "none",
            },
          },
        }}
        onClick={open}
      >
        検索
      </Button>

      <ChatSearchModal opened={opened} close={close} />
    </>
  );
};
