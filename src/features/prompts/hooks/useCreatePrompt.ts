import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/providers/auth";
import {
  createPrompt,
  CreatePromptDTO,
} from "@/features/prompts/api/createPrompt";
import { promptListQueryKey } from "@/features/prompts/hooks/usePromptList";
import { Prompt } from "@/features/prompts/types/prompt";

type Options = {
  prompts?: Prompt[];
};

export const useCreatePrompt = ({ prompts }: Options = {}) => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: (params: CreatePromptDTO["params"]) =>
      createPrompt({ userId: user!.id, prompts, params }),
    onSuccess: (prompt) => {
      queryClient.setQueryData<Prompt[]>(
        promptListQueryKey({ userId: user!.id }),
        (prompts) => {
          if (prompts == undefined) return [prompt];
          if (prompts.some(({ id }) => id === prompt.id)) return prompts;
          return [...prompts, prompt];
        }
      );
    },
  });
};
