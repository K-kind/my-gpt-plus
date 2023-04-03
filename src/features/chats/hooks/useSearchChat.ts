import { searchChat } from "@/features/chats/api/searchChat";
import { ExtractFnReturnType, QueryConfig } from "@/shared/lib/reactQuery";
import { useQuery } from "@tanstack/react-query";

type QueryFnType = typeof searchChat;

type Options = {
  word: string;
  config?: QueryConfig<QueryFnType>;
};

export const searchChatQueryKey = (word: string) => ["searchChats", word];

export const useSearchChat = ({ word, config }: Options) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: searchChatQueryKey(word),
    queryFn: ({ signal }) => searchChat({ params: { word }, signal }),
    ...config,
  });
};
