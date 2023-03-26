import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "@/features/messages/api/createMessage";
import {
  createChatCompletion,
  CreateChatCompletionDTO,
} from "@/features/chats/api/createChatCompletion";
import { Message } from "@/features/messages/types/message";
import { messageListByChatIdQueryKey } from "@/features/messages/hooks/useMessageList";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/providers/auth";

type CreateAssistantMessageParams = CreateChatCompletionDTO["params"] & {
  chatId: string;
  userId: string;
};

const createAssistantMessage = async (params: CreateAssistantMessageParams) => {
  const { data } = await createChatCompletion({ params });
  return await createMessage({
    params: {
      chatId: params.chatId,
      userId: params.userId,
      role: "assistant",
      content: data.choices[0].message.content.trim(),
      finishReason: data.choices[0].finish_reason,
      completionTokens: data.usage?.completion_tokens!,
      promptTokens: data.usage?.prompt_tokens!,
      totalTokens: data.usage?.total_tokens!,
      idFromOpenAI: data.id,
      model: data.model,
    },
  });
};

export const useCreateAssistantMessage = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: (params: Omit<CreateAssistantMessageParams, "userId">) =>
      createAssistantMessage({ userId: user!.id, ...params }),
    onSuccess: (message) => {
      queryClient.setQueryData<Message[]>(
        messageListByChatIdQueryKey(message.chatId, { userId: user!.id }),
        (messages) => {
          if (messages == undefined) return [message];
          if (messages.some(({ id }) => id === message.id)) return messages;
          return [...messages, message];
        }
      );
    },
  });
};
