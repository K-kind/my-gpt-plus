import { AuthContext } from "@/features/auth/providers/auth";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { APP_NAME } from "@/shared/contants";
import { AppShell, Button, Container, Flex, Header, Text } from "@mantine/core";
import Link from "next/link";
import { ReactNode, Suspense, useContext } from "react";

type Props = {
  children: ReactNode;
};

export const SimpleLayout = ({ children }: Props) => {
  const { user } = useContext(AuthContext);

  return (
    <AppShell
      header={
        <Header height={50}>
          <Container>
            <Flex align="center" justify="space-between" h={50}>
              <Text component={Link} fz="xl" href="/">
                {APP_NAME}
              </Text>
              {user == null && (
                <Button component={Link} href="/signin" variant="subtle">
                  ログイン
                </Button>
              )}
            </Flex>
          </Container>
        </Header>
      }
    >
      <Suspense fallback={<ContentLoader />}>{children}</Suspense>
    </AppShell>
  );
};
