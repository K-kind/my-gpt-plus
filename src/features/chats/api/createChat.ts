import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { getChat } from "@/features/chats/api/getChat";
import { AssignableModel } from "@/features/chats/types/chat";
import { Prompt } from "@/features/prompts/types/prompt";

type CreateChatParams = {
  model: AssignableModel;
  prompts: Prompt[];
  initialContent: string;
};

export type CreateChatDTO = {
  userId: string;
  params: CreateChatParams;
};

export const createChat = async ({ userId, params }: CreateChatDTO) => {
  const chatRef = await addDoc(collection(db, "chats"), {
    userId,
    model: params.model,
    prompts: params.prompts.map((prompt) => ({
      id: prompt.id,
      title: prompt.title,
      content: prompt.content,
    })),
    title: params.initialContent.slice(0, 22),
    createdAt: serverTimestamp(),
  });

  return await getChat({ id: chatRef.id });
};
