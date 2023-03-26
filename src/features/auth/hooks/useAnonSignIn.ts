import { anonSignIn } from "@/features/auth/api/anonSignIn";
import { AuthContext } from "@/features/auth/providers/auth";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export const useAnonSignIn = () => {
  const { setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: () => anonSignIn().then((user) => setUser(user)),
  });
};
