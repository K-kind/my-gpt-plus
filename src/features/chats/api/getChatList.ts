import { ChatRawData, parseRawChat } from "@/features/chats/api/getChat";
import { db } from "@/shared/lib/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

export type GetChatListDTO = {
  sort?: "asc" | "desc";
  perPage?: number;
};

export const getChatList = async ({
  sort = "desc",
  perPage = 12,
}: GetChatListDTO) => {
  const q = query(
    collection(db, "chats"),
    orderBy("createdAt", sort),
    limit(perPage)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const rawData = { id: doc.id, ...doc.data() } as ChatRawData;
    return parseRawChat(rawData);
  });
};
