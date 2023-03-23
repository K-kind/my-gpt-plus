import { getChatList, GetChatListDTO } from "@/features/chats/api/getChatList";
import { ExtractFnReturnType, QueryConfig } from "@/shared/lib/reactQuery";
import { useQuery } from "@tanstack/react-query";

type QueryFnType = typeof getChatList;

type Options = GetChatListDTO & {
  config?: QueryConfig<QueryFnType>;
};

export const chatQueryKey = (options: GetChatListDTO = {}) => [
  "chats",
  { options },
];

export const useChatList = ({ sort, perPage, config }: Options = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: chatQueryKey({ sort, perPage }),
    queryFn: () => getChatList({ sort, perPage }),
    ...config,
  });
};
