import { getChat } from "@/features/chats/api/getChat";
import { ExtractFnReturnType, QueryConfig } from "@/shared/lib/reactQuery";
import { useQuery } from "@tanstack/react-query";

type QueryFnType = typeof getChat;

type Options = {
  id: string;
  config?: QueryConfig<QueryFnType>;
};

export const chatQueryKey = (id: string) => ["chats", id];

export const useChat = ({ id, config }: Options) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: chatQueryKey(id),
    queryFn: () => getChat({ id }),
    staleTime: 5 * 60 * 1000,
    ...config,
  });
};
