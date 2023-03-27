import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createMessage,
  CreateMessageDTO,
} from "@/features/messages/api/createMessage";
import { messageListByChatIdQueryKey } from "@/features/messages/hooks/useMessageList";
import { Message } from "@/features/messages/types/message";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/providers/auth";

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: (params: Omit<CreateMessageDTO["params"], "userId">) => {
      return createMessage({ params: { ...params, userId: user!.id } });
    },
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
