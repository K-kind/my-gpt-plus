import { Popover, Text, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHelp } from "@tabler/icons-react";

export const MiniPromptHelpMark = () => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover
      width={320}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
    >
      <Popover.Target>
        <ThemeIcon
          size={18}
          radius="xl"
          variant="light"
          color="gray"
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <IconHelp />
        </ThemeIcon>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: "none" }}>
        <Text size="sm">
          質問文とは別にAIに指示を与えることができます。「事前指示管理」で作成可能です。
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
};
