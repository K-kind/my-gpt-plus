import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import type { NextPage } from "next";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/features/auth/providers/auth";
import { AppHead } from "@/shared/components/AppHead";
import { AuthGuard } from "@/features/auth/components/AuthGuard";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSRは不要なため
  if (!mounted) return <AppHead />;

  const getLayout = Component.getLayout || ((page) => page);
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        components: {
          Button: {
            defaultProps: () => ({
              loaderPosition: "center",
            }),
          },
        },
      }}
    >
      <Notifications position="top-right" />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthGuard>{getLayout(<Component {...pageProps} />)}</AuthGuard>
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
