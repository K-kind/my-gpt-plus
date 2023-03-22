import { AssignableModel, Chat } from "@/features/chats/types/chat";
import { db } from "@/shared/lib/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";

export type ChatRawData = {
  id: string;
  userId: string;
  model: AssignableModel;
  systemContent: string | null;
  title: string;
  /** 作成直後はnullの場合がある */
  createdAt: Timestamp | null;
};

export const parseRawChat = (rawData: ChatRawData): Chat => {
  return {
    ...rawData,
    createdAt: rawData.createdAt?.toDate() ?? new Date(),
  };
};

export type GetChatDTO = {
  id: string;
};

export const getChat = async ({ id }: GetChatDTO) => {
  const chatRef = doc(db, "chats", id);
  const chatDoc = await getDoc(chatRef);
  const rawData = { id: chatRef.id, ...chatDoc.data() } as ChatRawData;
  return parseRawChat(rawData);
};
