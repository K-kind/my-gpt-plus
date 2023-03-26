import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/providers/auth";
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
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: (params: UpdatePromptDTO["params"]) =>
      updatePrompt({ id, params }),
    onSuccess: (updatedPrompt) => {
      queryClient.setQueryData<Prompt[]>(
        promptListQueryKey({ userId: user!.id }),
        (prompts) => {
          if (prompts == undefined) return;
          return prompts.map((prompt) => {
            if (prompt.id !== updatedPrompt.id) return prompt;
            return updatedPrompt;
          });
        }
      );

      queryClient.setQueryData<Prompt>(
        promptQueryKey(updatedPrompt.id),
        () => updatedPrompt
      );
    },
  });
};
