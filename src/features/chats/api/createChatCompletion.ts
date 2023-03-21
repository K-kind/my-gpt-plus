import { functions } from "@/shared/lib/firebase";
import { httpsCallable } from "firebase/functions";

type CreateChatCompletionParams = {
  model: "gpt-3.5-turbo" | "gpt-4";
  messages: { role: "user" | "system" | "assistant"; content: string }[];
};

export type CreateChatCompletionDTO = {
  params: CreateChatCompletionParams;
};

type CreateChatCompletionResponse = {
  data: {
    id: string;
    model: string;
    usage:
      | {
          prompt_tokens: number;
          completion_tokens: number;
          total_tokens: number;
        }
      | undefined;
    choices: {
      index: number;
      finish_reason: string;
      message: { role: "user" | "system" | "assistant"; content: string };
    }[];
  };
};

export const createChatCompletion = async ({
  params,
}: CreateChatCompletionDTO) => {
  const doCreateChatCompletion = httpsCallable<
    CreateChatCompletionParams,
    CreateChatCompletionResponse
  >(functions, "createChatCompletion");
  const { data } = await doCreateChatCompletion(params);

  return data;
};
