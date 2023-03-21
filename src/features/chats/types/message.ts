export type UserMessage = {
  id: string;
  chatId: string;
  role: "user";
  content: string;
  createdAt: Date;
};

export type AssistantMessage = {
  id: string;
  chatId: string;
  role: "assistant";
  content: string;
  finishReason: string;
  completionTokens: number;
  promptTokens: number;
  totalTokens: number;
  idFromOpenAI: string;
  model: string;
  createdAt: Date;
};

export type Message = UserMessage | AssistantMessage;
