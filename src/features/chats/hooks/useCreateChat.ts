import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChat, CreateChatDTO } from "@/features/chats/api/createChat";
import { Chat } from "@/features/chats/types/chat";
import { chatListQueryKey } from "@/features/chats/hooks/useChatList";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/providers/auth";

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: (params: CreateChatDTO["params"]) =>
      createChat({ userId: user!.id, params }),
    onSuccess: (chat) => {
      queryClient.setQueryData<Chat[]>(
        chatListQueryKey({ userId: user!.id }),
        (chats) => {
          if (chats == undefined) return [chat];
          if (chats.some(({ id }) => id === chat.id)) return chats;
          return [chat, ...chats];
        }
      );
    },
  });
};
