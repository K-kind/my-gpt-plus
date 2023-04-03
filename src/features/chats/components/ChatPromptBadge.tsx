import { ChatPrompt } from "@/features/chats/types/chat";
import { Badge, Popover, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  chatPrompt: ChatPrompt;
};

export const ChatPromptBadge = ({ chatPrompt }: Props) => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Badge
          size="lg"
          variant="outline"
          sx={{ textTransform: "none" }}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          {chatPrompt.title}
        </Badge>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: "none" }} maw="100vw">
        <Text size="sm" sx={{ whiteSpace: "pre-wrap" }}>
          {chatPrompt.content}
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
};
