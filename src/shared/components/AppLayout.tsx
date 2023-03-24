import { AppNavbar } from "@/shared/components/AppNavbar";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { AppShell } from "@mantine/core";
import { ReactNode, Suspense } from "react";

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <AppShell navbar={<AppNavbar />} padding={0}>
      <Suspense fallback={<ContentLoader />}>{children}</Suspense>
    </AppShell>
  );
};
