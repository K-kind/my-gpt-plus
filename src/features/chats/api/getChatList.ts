import { ChatRawData, parseRawChat } from "@/features/chats/api/getChat";
import { db } from "@/shared/lib/firebase";
import {
  collection,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

export type GetChatListDTO = {
  userId: string;
  perPage?: number;
  /** ソートはcreatedAtのみ */
  sort?: "asc" | "desc";
  after?: Date;
  before?: Date;
};

export const getChatList = async ({
  userId,
  sort = "desc",
  perPage = 12,
  after,
  before,
}: GetChatListDTO) => {
  const q = query(
    collection(db, "chats"),
    ...[
      where("userId", "==", userId),
      orderBy("createdAt", sort),
      ...(after ? [startAfter(after)] : []),
      ...(before ? [endBefore(before)] : []),
      before ? limitToLast(perPage) : limit(perPage),
    ]
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const rawData = { id: doc.id, ...doc.data() } as ChatRawData;
    return parseRawChat(rawData);
  });
};
