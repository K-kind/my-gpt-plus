import { doc, writeBatch } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { Prompt } from "@/features/prompts/types/prompt";

export type DeletePromptDTO = {
  prompt: Prompt;
  prompts: Prompt[];
};

export const deletePrompt = async ({ prompt, prompts }: DeletePromptDTO) => {
  const batch = writeBatch(db);
  batch.delete(doc(db, "prompts", prompt.id));
  prompts
    .filter(({ seq }) => seq > prompt.seq)
    .forEach((p) => {
      batch.update(doc(db, "prompts", p.id), { seq: p.seq - 1 });
    });
  await batch.commit();
  return { id: prompt.id };
};
