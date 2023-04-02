import { SignInPage } from "@/features/auth/components/SignInPage";
import { NextPageWithLayout } from "@/pages/_app";
import { AppHead } from "@/shared/components/AppHead";
import { SimpleLayout } from "@/shared/components/SimpleLayout";
import { ReactElement } from "react";

const PagesSigninIndex: NextPageWithLayout = () => {
  return (
    <>
      <AppHead />
      <SignInPage />
    </>
  );
};

PagesSigninIndex.getLayout = (page: ReactElement) => {
  return <SimpleLayout>{page}</SimpleLayout>;
};

export default PagesSigninIndex;
