import { AuthContext } from "@/features/auth/providers/auth";
import { getChatList, GetChatListDTO } from "@/features/chats/api/getChatList";
import { ExtractFnReturnType, QueryConfig } from "@/shared/lib/reactQuery";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

type QueryFnType = typeof getChatList;

type Options = GetChatListDTO & {
  config?: QueryConfig<QueryFnType>;
};

export const chatListQueryKey = (options: GetChatListDTO) => [
  "chats",
  "index",
  { options },
];

export const useChatList = ({
  config,
  ...options
}: Omit<Options, "userId"> = {}) => {
  const { user } = useContext(AuthContext);
  const optionsWithUserId = { userId: user!.id, ...options };

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: chatListQueryKey(optionsWithUserId),
    queryFn: () => getChatList(optionsWithUserId),
    ...config,
  });
};
