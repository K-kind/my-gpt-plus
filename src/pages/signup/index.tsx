import { SignUpPage } from "@/features/auth/components/SignUpPage";
import { AuthContext } from "@/features/auth/providers/auth";
import { NextPageWithLayout } from "@/pages/_app";
import { AppHead } from "@/shared/components/AppHead";
import { SimpleLayout } from "@/shared/components/SimpleLayout";
import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect } from "react";

const PagesSignupIndex: NextPageWithLayout = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (user!.isAnonymous === false) {
      router.push("/chats/new");
    }
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
  return <SimpleLayout>{page}</SimpleLayout>;
};

export default PagesSignupIndex;
