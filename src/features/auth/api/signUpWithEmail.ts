import { User } from "@/features/auth/types/auth";
import { auth } from "@/shared/lib/firebase";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  linkWithCredential,
  User as FirebaseUser,
} from "firebase/auth";

export type EmailSignUpParams = {
  email: string;
  password: string;
};

export const signUpWithEmail = async ({
  email,
  password,
}: EmailSignUpParams): Promise<User> => {
  if (auth.currentUser) {
    return await signUpFromAnonymous(auth.currentUser, { email, password });
  } else {
    return await signUpNewUser({ email, password });
  }
};

const signUpFromAnonymous = async (
  anonUser: FirebaseUser,
  { email, password }: EmailSignUpParams
) => {
  const credential = EmailAuthProvider.credential(email, password);
  const { user } = await linkWithCredential(anonUser, credential);
  return { id: user.uid, isAnonymous: user.isAnonymous };
};

const signUpNewUser = async ({ email, password }: EmailSignUpParams) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return { id: user.uid, isAnonymous: user.isAnonymous };
};
