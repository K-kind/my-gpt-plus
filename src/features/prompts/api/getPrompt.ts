import { Prompt } from "@/features/prompts/types/prompt";
import { db } from "@/shared/lib/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";

export type PromptRawData = {
  id: string;
  userId: string;
  title: string;
  content: string;
  seq: number;
  isDefault: boolean;
  /** 作成直後はnullの場合がある */
  createdAt: Timestamp | null;
};

export const parseRawPrompt = (rawData: PromptRawData): Prompt => {
  return {
    ...rawData,
    createdAt: rawData.createdAt?.toDate() ?? new Date(),
  };
};

export type GetPromptDTO = {
  id: string;
};

export const getPrompt = async ({ id }: GetPromptDTO) => {
  const promptRef = doc(db, "prompts", id);
  const promptDoc = await getDoc(promptRef);
  const rawData = { id: promptRef.id, ...promptDoc.data() } as PromptRawData;
  return parseRawPrompt(rawData);
};
