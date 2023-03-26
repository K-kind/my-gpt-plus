import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { Message } from "@/features/chats/types/message";

export type UserMessageRawData = {
  id: string;
  chatId: string;
  userId: string;
  role: "user";
  content: string;
  /** 作成直後はnullの場合がある */
  createdAt: Timestamp | null;
};

export type AssistantMessageRawData = {
  id: string;
  chatId: string;
  userId: string;
  role: "assistant";
  content: string;
  finishReason: string;
  completionTokens: number;
  promptTokens: number;
  totalTokens: number;
  idFromOpenAI: string;
  model: string;
  /** 作成直後はnullの場合がある */
  createdAt: Timestamp | null;
};

export type MessageRawData = UserMessageRawData | AssistantMessageRawData;

export const parseRawMessage = (rawData: MessageRawData): Message => {
  return {
    ...rawData,
    createdAt: rawData.createdAt?.toDate() ?? new Date(),
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
