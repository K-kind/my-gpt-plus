import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { Message } from "@/features/chats/types/message";

export type UserMessageRawData = {
  id: string;
  chatId: string;
  role: "user";
  content: string;
  createdAt: Timestamp;
};

export type AssistantMessageRawData = {
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
  createdAt: Timestamp;
};

export type MessageRawData = UserMessageRawData | AssistantMessageRawData;

export const parseRawMessage = (rawData: MessageRawData): Message => {
  return {
    ...rawData,
    createdAt: rawData.createdAt.toDate(),
  };
};

export type GetMessageDTO = {
  chatId: string;
  id: string;
};

export const getMessage = async ({ chatId, id }: GetMessageDTO) => {
  const messageRef = doc(db, "chats", chatId, "messages", id);
  const messageDoc = await getDoc(messageRef);
  const rawData = { id: messageRef.id, ...messageDoc.data() } as MessageRawData;
  return parseRawMessage(rawData);
};
