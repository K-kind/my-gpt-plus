import {
  MessageRawData,
  parseRawMessage,
} from "@/features/messages/api/getMessage";
import { db } from "@/shared/lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export type GetMessageListByChatIdDTO = {
  chatId: string;
  userId: string;
};

export const getMessageListByChatId = async ({
  chatId,
  userId,
}: GetMessageListByChatIdDTO) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    where("userId", "==", userId),
    orderBy("createdAt", "asc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const rawData = { id: doc.id, ...doc.data() } as MessageRawData;
    return parseRawMessage(rawData);
  });
};
