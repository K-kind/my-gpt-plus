import { NewChatPage } from "@/features/chats/components/NewChatPage";
import { NextPageWithLayout } from "@/pages/_app";
import { AppHead } from "@/shared/components/AppHead";
import { AppLayout } from "@/shared/components/AppLayout";
import { ReactElement } from "react";

const ChatsNewPage: NextPageWithLayout = () => {
  return (
    <>
      <AppHead />
      <NewChatPage />
    </>
  );
};

ChatsNewPage.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default ChatsNewPage;
