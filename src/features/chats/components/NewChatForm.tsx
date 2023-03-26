import {
  AssignableModel,
  ASSIGNABLE_MODEL,
  MODEL_INFO,
} from "@/features/chats/types/chat";
import { Box, Flex, MultiSelect, Select, Text } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";
import { NewMessageForm } from "@/features/messages/components/NewMessageForm";
import { Prompt } from "@/features/prompts/types/prompt";
import { usePromptList } from "@/features/prompts/hooks/usePromptList";

export type HandleSubmitParams = {
  model: AssignableModel;
  prompts: Prompt[];
  content: string;
  setContent: (content: string) => void;
};

type Props = {
  handleSubmit: (params: HandleSubmitParams) => void;
};

const modelOptions = Object.values(ASSIGNABLE_MODEL).map((model) => ({
  value: model,
  label: MODEL_INFO[model].detailName,
}));

export const NewChatForm = ({ handleSubmit }: Props) => {
  const promptListQuery = usePromptList();

  const [model, setModel] = useState<AssignableModel>("gpt-3.5-turbo");
  const [selectedPromptIds, setSelectedPromptIds] = useState<string[]>(
    promptListQuery
      .data!.filter(({ isDefault }) => isDefault)
      .map(({ id }) => id)
  );

  const onChangeModel = useCallback((value: string | null) => {
    setModel(value as AssignableModel);
  }, []);

  const emitSubmit = useCallback(
    (content: string, setContent: (content: string) => void) => {
      handleSubmit({
        model,
        prompts: selectedPromptIds.map(
          (id) => promptListQuery.data!.find((prompt) => prompt.id === id)!
        ),
        content,
        setContent,
      });
    },
    [handleSubmit, model, promptListQuery.data, selectedPromptIds]
  );

  const promptOptions = useMemo(
    () =>
      promptListQuery.data!.map((prompt) => ({
        value: prompt.id,
        label: prompt.title,
      })),
    [promptListQuery.data]
  );

  return (
    <Box sx={{ position: "relative" }} h="100%">
      <Flex direction="column" align="center" pt="md">
        <Select
          label="モデル"
          value={model}
          data={modelOptions}
          w={240}
          mb="lg"
          onChange={onChangeModel}
        />
        <MultiSelect
          data={promptOptions}
          value={selectedPromptIds}
          label="メタプロンプト"
          searchable
          clearable
          nothingFound="データが見つかりません"
          w={240}
          mb="lg"
          onChange={setSelectedPromptIds}
        />
      </Flex>
      <Box sx={{ position: "absolute", bottom: 0 }} w="100%" px="sm" pb="xl">
        <NewMessageForm handleSubmit={emitSubmit} />
      </Box>
    </Box>
  );
};