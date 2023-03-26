import { AuthContext } from "@/features/auth/providers/auth";
import { getMessageListByChatId } from "@/features/messages/api/getMessageList";
import { ExtractFnReturnType, QueryConfig } from "@/shared/lib/reactQuery";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

type ByChatIdQueryFnType = typeof getMessageListByChatId;

type ByChatIdOptions = {
  chatId: string;
  config?: QueryConfig<ByChatIdQueryFnType>;
};

export const messageListByChatIdQueryKey = (
  chatId: string,
  options: { userId: string }
) => ["chats", chatId, "messages", "index", options];

export const useMessageListByChatId = ({ chatId, config }: ByChatIdOptions) => {
  const { user } = useContext(AuthContext);

  return useQuery<ExtractFnReturnType<ByChatIdQueryFnType>>({
    queryKey: messageListByChatIdQueryKey(chatId, { userId: user!.id }),
    queryFn: () => getMessageListByChatId({ chatId, userId: user!.id }),
    ...config,
  });
};
