import { ContentLoader } from "@/shared/components/ContentLoader";
import { APP_NAME } from "@/shared/contants";
import { AppShell, Container, Flex, Header, Text } from "@mantine/core";
import Link from "next/link";
import { ReactNode, Suspense } from "react";

type Props = {
  children: ReactNode;
};

export const SimpleLayout = ({ children }: Props) => {
  return (
    <AppShell
      header={
        <Header height={50}>
          <Container>
            <Flex align="center" h={50}>
              <Text component={Link} fz="xl" href="/">
                {APP_NAME}
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
