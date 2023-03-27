import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { getMessage } from "@/features/messages/api/getMessage";

type CreateMessageParams = {
  chatId: string;
  userId: string;
  role: "user" | "assistant";
  content: string;
};

export type CreateMessageDTO = {
  params: CreateMessageParams;
};

export const createMessage = async ({ params }: CreateMessageDTO) => {
  const messageRef = await addDoc(
    collection(db, "chats", params.chatId, "messages"),
    {
      ...params,
      createdAt: serverTimestamp(),
    }
  );

  return await getMessage({ chatId: params.chatId, id: messageRef.id });
};
