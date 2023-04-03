import { auth } from "@/shared/lib/firebase";

export type SearchChatDTO = {
  params: { word: string };
  signal?: AbortSignal;
};

type ChatSearchData = {
  id: string;
  title: string;
  highlight: {
    key: "title" | "messages.content" | "prompts.title";
    body: string;
  } | null;
};

type ChatSearchResponse = {
  total: number;
  data: ChatSearchData[];
};

export const searchChat = async ({ params, signal }: SearchChatDTO) => {
  const query = new URLSearchParams(params);
  const idToken = await auth.currentUser!.getIdToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search_chats?${query}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      signal,
    }
  );

  const data: ChatSearchResponse = await response.json();
  return data;
};
