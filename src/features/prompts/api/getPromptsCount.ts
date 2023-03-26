import { db } from "@/shared/lib/firebase";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";

export type GetPromptsCountDTO = {
  userId: string;
};

export const getPromptsCount = async ({ userId }: GetPromptsCountDTO) => {
  const snapshot = await getCountFromServer(
    query(collection(db, "prompts"), where("userId", "==", userId))
  );
  return { count: snapshot.data().count };
};
