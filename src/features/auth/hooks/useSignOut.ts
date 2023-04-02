import { signOut } from "@/features/auth/api/signOut";
import { useMutation } from "@tanstack/react-query";

export const useSignOut = () => {
  return useMutation({
    // ログアウト後すぐにsetUser(null)すると弊害があるため、setUserは使用側で行う
    mutationFn: signOut,
  });
};
