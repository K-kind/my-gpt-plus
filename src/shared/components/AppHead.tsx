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
      <meta name="description" content="ChatGPTを少し便利にしたアプリ" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content="https://my-gpt-plus.k-kind.dev" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://my-gpt-plus.k-kind.dev/images/ogp.png"
      />
      <meta property="og:title" content={appTitle} />
      <meta property="og:description" content="ChatGPTを少し便利にしたアプリ" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
