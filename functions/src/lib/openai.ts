import { Configuration, CreateChatCompletionRequest, OpenAIApi } from "openai";
import { parameterizedConfigs } from "../constants/parameterizedConfigs";

const API_KEY = parameterizedConfigs.OPEN_AI_API_KEY.value();
const openai = new OpenAIApi(new Configuration({ apiKey: API_KEY }));

type RequestParams = Pick<CreateChatCompletionRequest, "model" | "messages">;

export const doCreateChatCompletion = async (request: RequestParams) => {
  let data;
  let error;
  try {
    const response = await openai.createChatCompletion(request);
    data = response.data;
  } catch (e) {
    error = (e as any).response?.data ?? e;
  }

  return { data, error };
};

const ALLOWED_MODELS = ["gpt-3.5-turbo", "gpt-4"] as const;

export const validateParams = (data: unknown) => {
  if (data == null || typeof data !== "object") return;

  const obj = data as { [key: string]: unknown };
  if (!Array.isArray(obj?.messages)) return;
  if (typeof obj.model !== "string") return;
  if (!ALLOWED_MODELS.includes(obj.model as any)) return;

  return {
    messages: obj.messages as RequestParams["messages"],
    model: obj.model as RequestParams["model"],
  };
};
