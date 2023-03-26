import { PromptListTable } from "@/features/prompts/components/PromptListTable";
import { usePromptList } from "@/features/prompts/hooks/usePromptList";
import { Box, Button } from "@mantine/core";
import Link from "next/link";

export const PromptList = () => {
  const promptListQuery = usePromptList();

  return (
    <Box>
      <Button mb="lg" component={Link} href="/prompts/new">
        追加
      </Button>
      <Box mih={300}>
        <PromptListTable prompts={promptListQuery.data!} />
      </Box>
    </Box>
  );
};
