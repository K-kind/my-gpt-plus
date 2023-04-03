import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePrompt } from "@/features/prompts/api/deletePrompt";
import { promptListQueryKey } from "@/features/prompts/hooks/usePromptList";
import { Prompt } from "@/features/prompts/types/prompt";

type Options = {
  prompt: Prompt;
  prompts: Prompt[];
};

export const useDeletePrompt = ({ prompt, prompts }: Options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePrompt({ prompt, prompts }),
    onSuccess: () => {
      queryClient.invalidateQueries(promptListQueryKey());
    },
  });
};
