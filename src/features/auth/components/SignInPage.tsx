import { SignInForm } from "@/features/auth/components/SignInForm";
import { Button, Container, Flex } from "@mantine/core";
import Link from "next/link";

export const SignInPage = () => {
  return (
    <Container pt={48} pb="xl">
      <Flex direction="column" align="center">
        <SignInForm />
        <Button component={Link} href="/" variant="subtle" mt="xl">
          トップに戻る
        </Button>
      </Flex>
    </Container>
  );
};
