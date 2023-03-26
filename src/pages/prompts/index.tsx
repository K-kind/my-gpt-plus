import { PromptIndexPage } from "@/features/prompts/components/PromptIndexPage";
import { NextPageWithLayout } from "@/pages/_app";
import { AppHead } from "@/shared/components/AppHead";
import { AppLayout } from "@/shared/components/AppLayout";
import { ReactElement } from "react";

const PagesPromptsIndex: NextPageWithLayout = () => {
  return (
    <>
      <AppHead />
      <PromptIndexPage />
    </>
  );
};

PagesPromptsIndex.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default PagesPromptsIndex;
