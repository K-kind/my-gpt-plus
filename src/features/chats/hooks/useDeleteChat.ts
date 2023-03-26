import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatListQueryKey } from "@/features/chats/hooks/useChatList";
import { deleteChat, DeleteChatDTO } from "@/features/chats/api/deleteChat";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/providers/auth";

export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: (id: DeleteChatDTO["id"]) => deleteChat({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(chatListQueryKey({ userId: user!.id }));
    },
    // onSuccess: ({ id }) => {
    // queryClient.setQueriesData<Chat[]>(chatListQueryKey(), (chats) => {
    //   if (chats == undefined) return;
    //   return chats.filter((chat) => chat.id !== id);
    // });
    // },
  });
};
