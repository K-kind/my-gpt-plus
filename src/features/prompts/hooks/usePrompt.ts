import { getPrompt } from "@/features/prompts/api/getPrompt";
import { ExtractFnReturnType, QueryConfig } from "@/shared/lib/reactQuery";
import { useQuery } from "@tanstack/react-query";

type QueryFnType = typeof getPrompt;

type Options = {
  id: string;
  config?: QueryConfig<QueryFnType>;
};

export const promptQueryKey = (id: string) => ["prompts", id];

export const usePrompt = ({ id, config }: Options) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: promptQueryKey(id),
    queryFn: () => getPrompt({ id }),
    staleTime: 5 * 60 * 1000,
    ...config,
  });
};
