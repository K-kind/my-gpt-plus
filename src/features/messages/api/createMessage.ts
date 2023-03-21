import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { getMessage } from "@/features/messages/api/getMessage";

type CreateUserMessageParams = {
  chatId: string;
  role: "user";
  content: string;
};

type CreateAssistantMessageParams = {
  chatId: string;
  role: "assistant";
  content: string;
  finishReason: string;
  completionTokens: number;
  promptTokens: number;
  totalTokens: number;
  idFromOpenAI: string;
  model: string;
};

export type CreateMessageDTO = {
  params: CreateUserMessageParams | CreateAssistantMessageParams;
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
