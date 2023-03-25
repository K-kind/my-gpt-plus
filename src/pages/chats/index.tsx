import { ChatIndexPage } from "@/features/chats/components/ChatIndexPage";
import { NextPageWithLayout } from "@/pages/_app";
import { AppHead } from "@/shared/components/AppHead";
import { AppLayout } from "@/shared/components/AppLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const PagesChatsIndex: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <AppHead />
      <ChatIndexPage />
    </>
  );
};

PagesChatsIndex.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default PagesChatsIndex;
