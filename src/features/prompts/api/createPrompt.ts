import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { getPrompt } from "@/features/prompts/api/getPrompt";
import { Prompt } from "@/features/prompts/types/prompt";
import { getPromptsCount } from "@/features/prompts/api/getPromptsCount";

type CreatePromptParams = {
  title: string;
  content: string;
  seq?: number;
  isDefault?: boolean;
};

export type CreatePromptDTO = {
  userId: string;
  prompts?: Prompt[];
  params: CreatePromptParams;
};

export const createPrompt = async ({
  userId,
  prompts,
  params,
}: CreatePromptDTO) => {
  const promptRef = await addDoc(collection(db, "prompts"), {
    userId,
    createdAt: serverTimestamp(),
    ...params,
    seq:
      params.seq ??
      prompts?.length ??
      (
        await getPromptsCount({ userId })
      ).count,
    isDefault: params.isDefault ?? false,
  });

  return await getPrompt({ id: promptRef.id });
};
