import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatListQueryKey } from "@/features/chats/hooks/useChatList";
import { deleteChat, DeleteChatDTO } from "@/features/chats/api/deleteChat";

export const useDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: DeleteChatDTO["id"]) => deleteChat({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(chatListQueryKey());
    },
    // onSuccess: ({ id }) => {
    // queryClient.setQueriesData<Chat[]>(chatListQueryKey(), (chats) => {
    //   if (chats == undefined) return;
    //   return chats.filter((chat) => chat.id !== id);
    // });
    // },
  });
};
