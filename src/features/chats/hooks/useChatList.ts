import { getChatList, GetChatListDTO } from "@/features/chats/api/getChatList";
import { ExtractFnReturnType, QueryConfig } from "@/shared/lib/reactQuery";
import { useQuery } from "@tanstack/react-query";

type QueryFnType = typeof getChatList;

type Options = GetChatListDTO & {
  config?: QueryConfig<QueryFnType>;
};

export const chatListQueryKey = (options: GetChatListDTO = {}) => [
  "chats",
  "index",
  { options },
];

export const useChatList = ({ sort, perPage, config }: Options = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: chatListQueryKey({ sort, perPage }),
    queryFn: () => getChatList({ sort, perPage }),
    ...config,
  });
};
