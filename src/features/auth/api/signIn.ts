import { auth } from "@/shared/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export type SignInParams = { email: string; password: string };

export const signIn = async ({ email, password }: SignInParams) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return { id: user.uid, isAnonymous: user.isAnonymous };
};
