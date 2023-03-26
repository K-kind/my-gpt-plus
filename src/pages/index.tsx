import { HomePage } from "@/features/static/components/HomePage";
import { NextPageWithLayout } from "@/pages/_app";
import { AppHead } from "@/shared/components/AppHead";
import { SimpleLayout } from "@/shared/components/SimpleLayout";
import { ReactElement } from "react";

const PagesIndex: NextPageWithLayout = () => {
  return (
    <>
      <AppHead />
      <HomePage />
    </>
  );
};

PagesIndex.getLayout = (page: ReactElement) => {
  return <SimpleLayout>{page}</SimpleLayout>;
};

export default PagesIndex;
