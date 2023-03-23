import { ChatDetailsPage } from "@/features/chats/components/ChatDetailsPage";
import { NextPageWithLayout } from "@/pages/_app";
import { AppHead } from "@/shared/components/AppHead";
import { AppLayout } from "@/shared/components/AppLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const ChatsIdPage: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <AppHead />
      <ChatDetailsPage id={router.query.id as string} />
    </>
  );
};

ChatsIdPage.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default ChatsIdPage;
