import { auth } from "@/shared/lib/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";

export const signOut = async () => {
  await firebaseSignOut(auth);
};
