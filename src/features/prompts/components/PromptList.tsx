import { PromptListTable } from "@/features/prompts/components/PromptListTable";
import { usePromptList } from "@/features/prompts/hooks/usePromptList";
import { Box } from "@mantine/core";

export const PromptList = () => {
  const promptListQuery = usePromptList();

  console.log(promptListQuery.data);

  return (
    <Box>
      <Box mih={300}>
        <PromptListTable prompts={promptListQuery.data!} />
      </Box>
    </Box>
  );
};
