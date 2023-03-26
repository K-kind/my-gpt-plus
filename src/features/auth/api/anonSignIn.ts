import { User } from "@/features/auth/types/auth";
import { auth } from "@/shared/lib/firebase";
import { signInAnonymously } from "firebase/auth";

export const anonSignIn = async (): Promise<User> => {
  const { user } = await signInAnonymously(auth);
  return { id: user.uid, isAnonymous: user.isAnonymous };
};
