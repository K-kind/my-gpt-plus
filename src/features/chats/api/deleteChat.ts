import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";

export type DeleteChatDTO = {
  id: string;
};

export const deleteChat = async ({ id }: DeleteChatDTO) => {
  await deleteDoc(doc(db, "chats", id));
  return { id };
};
