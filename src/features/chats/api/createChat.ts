import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { getChat } from "@/features/chats/api/getChat";
import { AssignableModel } from "@/features/chats/types/chat";

type CreateChatParams = {
  userId: string;
  model: AssignableModel;
  systemContent: string | null;
  initialContent: string;
};

export type CreateChatDTO = {
  params: CreateChatParams;
};

export const createChat = async ({ params }: CreateChatDTO) => {
  const chatRef = await addDoc(collection(db, "chats"), {
    userId: params.userId,
    model: params.model,
    systemContent: params.systemContent,
    title: params.initialContent.slice(0, 20),
    createdAt: serverTimestamp(),
  });

  return await getChat({ id: chatRef.id });
};