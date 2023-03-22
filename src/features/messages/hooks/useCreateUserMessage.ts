import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "@/features/messages/api/createMessage";
import { messageListByChatIdQueryKey } from "@/features/messages/hooks/useMessageList";
import { Message } from "@/features/chats/types/message";

export const useCreateUserMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chatId, content }: { chatId: string; content: string }) =>
      createMessage({ params: { chatId, role: "user", content } }),
    onSuccess: (message) => {
      queryClient.setQueryData<Message[]>(
        messageListByChatIdQueryKey(message.chatId),
        (messages) => {
          if (messages == undefined) return [message];
          if (messages.some(({ id }) => id === message.id)) return messages;
          return [...messages, message];
        }
      );
    },
  });
};
