import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { getPrompt } from "@/features/prompts/api/getPrompt";

type UpdatePromptParams = {
  title?: string;
  content?: string;
  isDefault?: boolean;
};

export type UpdatePromptDTO = {
  id: string;
  params: UpdatePromptParams;
};

export const updatePrompt = async ({ id, params }: UpdatePromptDTO) => {
  const promptRef = await doc(db, "prompts", id);
  await updateDoc(promptRef, params);

  return await getPrompt({ id: promptRef.id });
};
