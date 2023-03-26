import { User } from "@/features/auth/types/auth";
import { createContext, ReactNode, useState } from "react";

export type ContextValue = {
  user: User | null | undefined;
  setUser: (user: User | null | undefined) => void;
};

export const AuthContext = createContext<ContextValue>({} as ContextValue);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const value: ContextValue = { user, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
