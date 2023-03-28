import { Popover, Text, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHelp } from "@tabler/icons-react";

export const PromptHelpMark = () => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover position="bottom-start" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <ThemeIcon
          size="md"
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
          AIに質問する際の事前指示を作成、管理します。
          <br />
          例「コード例を示す時はPythonを使って」
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
};
