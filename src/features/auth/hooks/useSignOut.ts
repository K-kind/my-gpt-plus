import { signOut } from "@/features/auth/api/signOut";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // ログアウト後すぐにsetUser(null)すると弊害があるため、setUserは使用側で行う
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
