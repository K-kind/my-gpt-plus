import { signIn, SignInParams } from "@/features/auth/api/signIn";
import { AuthContext } from "@/features/auth/providers/auth";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export const useSignIn = () => {
  const { setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: (params: SignInParams) =>
      signIn(params).then((user) => setUser(user)),
  });
};
