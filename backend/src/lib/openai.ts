import { config } from "dotenv";
import { IncomingMessage } from "http";
import { Configuration, CreateChatCompletionRequest, OpenAIApi } from "openai";

config()
const API_KEY = process.env.OPEN_AI_API_KEY!;
const openai = new OpenAIApi(new Configuration({ apiKey: API_KEY }));

export type RequestParams = Pick<
  CreateChatCompletionRequest,
  "model" | "messages"
>;

export async function* streamChatCompletion(params: RequestParams) {
  const response = await openai.createChatCompletion(
    {
      ...params,
      stream: true,
    },
    {
      responseType: "stream",
    }
  );

  const stream = response.data as unknown as IncomingMessage;
  for await (const chunk of stream) {
    const lines: string[] = chunk
      .toString("utf8")
      .split("\n")
      .filter((line: string) => line.trim().startsWith("data: "));

    for (const line of lines) {
      const message = line.replace(/^data: /, "");
      if (message === "[DONE]") {
        return;
      }

      const json = JSON.parse(message);
      const token: string | undefined = json.choices[0].delta.content;
      if (token) {
        yield token;
      }
    }
  }
}

const ASSIGNABLE_MODEL = {
  THREE_TURBO: "gpt-3.5-turbo",
  // FOUR: "gpt-4",
} as const;

export const validateParams = (data: unknown) => {
  if (data == null || typeof data !== "object") return;

  const obj = data as { [key: string]: unknown };
  if (!Array.isArray(obj?.messages)) return;
  if (typeof obj.model !== "string") return;
  if (!Object.values(ASSIGNABLE_MODEL).includes(obj.model as any)) return;

  return {
    messages: obj.messages as RequestParams["messages"],
    model: obj.model as RequestParams["model"],
  };
};
