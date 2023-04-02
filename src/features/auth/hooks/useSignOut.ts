import { signOut } from "@/features/auth/api/signOut";
import { AuthContext } from "@/features/auth/providers/auth";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export const useSignOut = () => {
  const { setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: () => signOut().then(() => setUser(null)),
  });
};
