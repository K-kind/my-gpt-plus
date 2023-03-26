import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { getPrompt } from "@/features/prompts/api/getPrompt";

type CreatePromptParams = {
  title: string;
  content: string;
  seq: number;
  isDefault?: boolean;
};

export type CreatePromptDTO = {
  userId: string;
  params: CreatePromptParams;
};

export const createPrompt = async ({ userId, params }: CreatePromptDTO) => {
  const promptRef = await addDoc(collection(db, "prompts"), {
    userId,
    createdAt: serverTimestamp(),
    ...params,
    isDefault: params.isDefault ?? false,
  });

  return await getPrompt({ id: promptRef.id });
};
