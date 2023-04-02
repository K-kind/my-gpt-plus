import { SignUpForm } from "@/features/auth/components/SignUpForm";
import { ItemWithTitle } from "@/shared/components/ItemWithTitle";
import { Box, Container, Flex } from "@mantine/core";

export const SignUpPage = () => {
  return (
    <Container pt={48} pb="xl">
      <Flex justify="center" mb={40}>
        <SignUpForm />
      </Flex>
      <ItemWithTitle>
        <Box sx={{ textAlign: "center" }}>
          <p>
            登録することで、データを永続化し、別端末とも共有できるようになります。
          </p>
          <p>お試しで作成されたデータも引き継がれます。</p>
        </Box>
      </ItemWithTitle>
    </Container>
  );
};
