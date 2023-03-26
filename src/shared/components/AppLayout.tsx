import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { useSetAuth } from "@/features/auth/hooks/useSetAuth";
import { AppNavbar } from "@/shared/components/AppNavbar";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { AppShell } from "@mantine/core";
import { ReactNode, Suspense } from "react";

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  useSetAuth();
  return (
    <AuthGuard>
      <AppShell navbar={<AppNavbar />} padding={0}>
        <Suspense fallback={<ContentLoader />}>{children}</Suspense>
      </AppShell>
    </AuthGuard>
  );
};
