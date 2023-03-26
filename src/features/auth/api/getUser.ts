import { User } from "@/features/auth/types/auth";
import { auth } from "@/shared/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const getUser = () => {
  return new Promise<User | null>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          resolve({ id: user.uid, isAnonymous: user.isAnonymous });
        } else {
          resolve(null);
        }
        unsubscribe();
      },
      (error) => {
        reject(error);
      }
    );
  });
};
