import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promptListQueryKey } from "@/features/prompts/hooks/usePromptList";
import { Prompt } from "@/features/prompts/types/prompt";
import {
  updatePrompt,
  UpdatePromptDTO,
} from "@/features/prompts/api/udpatePrompt";
import { promptQueryKey } from "@/features/prompts/hooks/usePrompt";

type Options = {
  id: string;
};

export const useUpdatePrompt = ({ id }: Options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdatePromptDTO["params"]) =>
      updatePrompt({ id, params }),
    onSuccess: (updatedPrompt) => {
      queryClient.setQueryData<Prompt[]>(promptListQueryKey(), (prompts) => {
        if (prompts == undefined) return;
        return prompts.map((prompt) => {
          if (prompt.id !== updatedPrompt.id) return prompt;
          return updatedPrompt;
        });
      });

      queryClient.setQueryData<Prompt>(
        promptQueryKey(updatedPrompt.id),
        () => updatedPrompt
      );
    },
  });
};
