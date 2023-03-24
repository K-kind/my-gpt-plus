import { getMessageListByChatId } from "@/features/messages/api/getMessageList";
import { ExtractFnReturnType, QueryConfig } from "@/shared/lib/reactQuery";
import { useQuery } from "@tanstack/react-query";

type ByChatIdQueryFnType = typeof getMessageListByChatId;

type ByChatIdOptions = {
  chatId: string;
  config?: QueryConfig<ByChatIdQueryFnType>;
};

export const messageListByChatIdQueryKey = (chatId: string) => [
  "chats",
  chatId,
  "messages",
  "index",
];

export const useMessageListByChatId = ({ chatId, config }: ByChatIdOptions) => {
  return useQuery<ExtractFnReturnType<ByChatIdQueryFnType>>({
    queryKey: messageListByChatIdQueryKey(chatId),
    queryFn: () => getMessageListByChatId({ chatId }),
    ...config,
  });
};
