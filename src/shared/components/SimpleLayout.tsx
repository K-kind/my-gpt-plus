import { useSetAuth } from "@/features/auth/hooks/useSetAuth";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { AppShell, Container, Flex, Header, Text } from "@mantine/core";
import Link from "next/link";
import { ReactNode, Suspense } from "react";

type Props = {
  children: ReactNode;
};

export const SimpleLayout = ({ children }: Props) => {
  useSetAuth();
  return (
    <AppShell
      header={
        <Header height={50}>
          <Container>
            <Flex align="center" h={50}>
              <Text component={Link} fz="xl" href="/">
                My Own GPT
              </Text>
            </Flex>
          </Container>
        </Header>
      }
    >
      <Suspense fallback={<ContentLoader />}>{children}</Suspense>
    </AppShell>
  );
};
