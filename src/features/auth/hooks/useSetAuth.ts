import { useContext, useEffect } from "react";
import { getUser } from "@/features/auth/api/getUser";
import { AuthContext } from "@/features/auth/providers/auth";

export const useSetAuth = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    getUser().then((u) => setUser(u));
  }, [setUser]);
};
