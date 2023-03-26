import { APP_NAME } from "@/shared/contants";
import Head from "next/head";

type Props = {
  title?: string;
};

export const AppHead = ({ title }: Props) => {
  const appTitle = `${APP_NAME}${title ? ` | ${title}` : ""}`;
  return (
    <Head>
      <title>{appTitle}</title>
      <meta name="description" content="個人用のChatGPTアプリ" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
