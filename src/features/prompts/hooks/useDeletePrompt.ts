import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/providers/auth";
import { deletePrompt } from "@/features/prompts/api/deletePrompt";
import { promptListQueryKey } from "@/features/prompts/hooks/usePromptList";
import { Prompt } from "@/features/prompts/types/prompt";

type Options = {
  prompt: Prompt;
  prompts: Prompt[];
};

export const useDeletePrompt = ({ prompt, prompts }: Options) => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: () => deletePrompt({ prompt, prompts }),
    onSuccess: () => {
      queryClient.invalidateQueries(promptListQueryKey({ userId: user!.id }));
    },
  });
};
