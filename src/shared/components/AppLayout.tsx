import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { useSetAuth } from "@/features/auth/hooks/useSetAuth";
import { AppNavbar } from "@/shared/components/AppNavbar";
import { AppSpHeader } from "@/shared/components/AppSpHeader";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { AppShell } from "@mantine/core";
import { useRouter } from "next/router";
import { ReactNode, Suspense, useCallback, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  useSetAuth();
  const router = useRouter();
  const [spNavbarOpened, setSpNavbarOpened] = useState(false);

  const closeSpNavBar = useCallback(() => {
    if (spNavbarOpened) setSpNavbarOpened(false);
  }, [setSpNavbarOpened, spNavbarOpened]);

  useEffect(() => {
    router.events.on("routeChangeComplete", closeSpNavBar);
    return () => {
      router.events.off("routeChangeComplete", closeSpNavBar);
    };
  }, [closeSpNavBar, router.events]);

  return (
    <AuthGuard>
      <AppShell
        header={
          <AppSpHeader
            spNavbarOpened={spNavbarOpened}
            setSpNavbarOpened={setSpNavbarOpened}
          />
        }
        navbar={<AppNavbar spNavbarOpened={spNavbarOpened} />}
        padding={0}
      >
        <Suspense fallback={<ContentLoader />}>{children}</Suspense>
      </AppShell>
    </AuthGuard>
  );
};
