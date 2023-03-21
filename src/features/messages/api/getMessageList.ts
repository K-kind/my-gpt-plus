import {
  MessageRawData,
  parseRawMessage,
} from "@/features/messages/api/getMessage";
import { db } from "@/shared/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export type GetMessageListByChatIdDTO = {
  chatId: string;
};

export const getMessageListByChatId = async ({
  chatId,
}: GetMessageListByChatIdDTO) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt", "asc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const rawData = { id: doc.id, ...doc.data() } as MessageRawData;
    return parseRawMessage(rawData);
  });
};
