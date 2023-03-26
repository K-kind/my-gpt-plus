import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "@/features/messages/api/createMessage";
import { messageListByChatIdQueryKey } from "@/features/messages/hooks/useMessageList";
import { Message } from "@/features/messages/types/message";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/providers/auth";

export const useCreateUserMessage = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: ({ chatId, content }: { chatId: string; content: string }) =>
      createMessage({
        params: { userId: user!.id, chatId, role: "user", content },
      }),
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
