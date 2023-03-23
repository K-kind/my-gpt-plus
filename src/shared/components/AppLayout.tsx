import { AppNavbar } from "@/shared/components/AppNavbar";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { AppShell, Container } from "@mantine/core";
import { ReactNode, Suspense } from "react";

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <AppShell navbar={<AppNavbar />}>
      <Suspense fallback={<ContentLoader />}>
        <Container size="xl">{children}</Container>
      </Suspense>
    </AppShell>
  );
};
