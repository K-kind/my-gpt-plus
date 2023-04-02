import { SignUpPage } from "@/features/auth/components/SignUpPage";
import { AuthContext } from "@/features/auth/providers/auth";
import { NextPageWithLayout } from "@/pages/_app";
import { AppHead } from "@/shared/components/AppHead";
import { AppLayout } from "@/shared/components/AppLayout";
import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect } from "react";

const PagesSignupIndex: NextPageWithLayout = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (user!.isAnonymous === false) {
      router.push("/chats/new");
    }
    // 最初だけ
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      <AppHead />
      <SignUpPage />
    </>
  );
};

PagesSignupIndex.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default PagesSignupIndex;
