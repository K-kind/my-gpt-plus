import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChat, CreateChatDTO } from "@/features/chats/api/createChat";
import { Chat } from "@/features/chats/types/chat";
import { chatListQueryKey } from "@/features/chats/hooks/useChatList";

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateChatDTO["params"]) => createChat({ params }),
    onSuccess: (chat) => {
      queryClient.setQueryData<Chat[]>(chatListQueryKey(), (chats) => {
        if (chats == undefined) return [chat];
        if (chats.some(({ id }) => id === chat.id)) return chats;
        return [chat, ...chats];
      });
    },
  });
};
