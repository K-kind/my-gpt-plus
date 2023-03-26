import {
  parseRawPrompt,
  PromptRawData,
} from "@/features/prompts/api/getPrompt";
import { db } from "@/shared/lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export type GetPromptListDTO = {
  userId: string;
};

export const getPromptList = async ({ userId }: GetPromptListDTO) => {
  const q = query(
    collection(db, "prompts"),
    where("userId", "==", userId),
    orderBy("seq", "asc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const rawData = { id: doc.id, ...doc.data() } as PromptRawData;
    return parseRawPrompt(rawData);
  });
};
