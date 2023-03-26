import { AuthContext } from "@/features/auth/providers/auth";
import {
  getPromptList,
  GetPromptListDTO,
} from "@/features/prompts/api/getPromptList";
import { ExtractFnReturnType, QueryConfig } from "@/shared/lib/reactQuery";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

type QueryFnType = typeof getPromptList;

type Options = GetPromptListDTO & {
  config?: QueryConfig<QueryFnType>;
};

export const promptListQueryKey = (options: GetPromptListDTO) => [
  "prompts",
  "index",
  { options },
];

export const usePromptList = ({ config }: Omit<Options, "userId"> = {}) => {
  const { user } = useContext(AuthContext);

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: promptListQueryKey({ userId: user!.id }),
    queryFn: () => getPromptList({ userId: user!.id }),
    ...config,
  });
};
