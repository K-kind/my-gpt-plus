import { PromptEditPage } from "@/features/prompts/components/PromptEditPage";
import { NextPageWithLayout } from "@/pages/_app";
import { AppHead } from "@/shared/components/AppHead";
import { AppLayout } from "@/shared/components/AppLayout";
import { ReactElement } from "react";

const PagesPromptsIdEdit: NextPageWithLayout = () => {
  return (
    <>
      <AppHead />
      <PromptEditPage />
    </>
  );
};

PagesPromptsIdEdit.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default PagesPromptsIdEdit;
