import { PromptNewPage } from "@/features/prompts/components/PromptNewPage";
import { NextPageWithLayout } from "@/pages/_app";
import { AppHead } from "@/shared/components/AppHead";
import { AppLayout } from "@/shared/components/AppLayout";
import { ReactElement } from "react";

const PagesPromptsNew: NextPageWithLayout = () => {
  return (
    <>
      <AppHead />
      <PromptNewPage />
    </>
  );
};

PagesPromptsNew.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default PagesPromptsNew;
