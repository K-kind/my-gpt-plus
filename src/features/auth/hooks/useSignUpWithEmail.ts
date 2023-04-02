import {
  EmailSignUpParams,
  signUpWithEmail,
} from "@/features/auth/api/signUpWithEmail";
import { AuthContext } from "@/features/auth/providers/auth";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export const useSignUpWithEmail = () => {
  const { setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: ({ email, password }: EmailSignUpParams) =>
      signUpWithEmail({ email, password }).then((user) => setUser(user)),
  });
};
