import { useMutation } from "@tanstack/react-query";
import { createChat, CreateChatDTO } from "@/features/chats/api/createChat";

export const useCreateChat = () => {
  return useMutation({
    mutationFn: (params: CreateChatDTO["params"]) => createChat({ params }),
  });
};
