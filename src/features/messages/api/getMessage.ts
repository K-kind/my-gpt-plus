import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { Message } from "@/features/messages/types/message";

export type MessageRawData = {
  id: string;
  chatId: string;
  userId: string;
  role: "user" | "assistant";
  content: string;
  /** 作成直後はnullの場合がある */
  createdAt: Timestamp | null;
};

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
