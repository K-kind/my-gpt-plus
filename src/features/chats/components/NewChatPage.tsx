import {
  ChatBoard,
  ChatBoardHandle,
} from "@/features/chats/components/ChatBoard";
import { useCreateChat } from "@/features/chats/hooks/useCreateChat";
import { Chat } from "@/features/chats/types/chat";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  HandleSubmitParams,
  NewChatForm,
} from "@/features/chats/components/NewChatForm";

type Props = {};

export const NewChatPage = ({}: Props) => {
  const router = useRouter();
  const [chat, setChat] = useState<Chat | null>(null);

  const chatBoardRef = useRef<ChatBoardHandle>(
    null as unknown as ChatBoardHandle
  );

  const createChatMutation = useCreateChat();

  useEffect(() => {
    if (router.query.id == undefined) {
      setChat(null);
    }
  }, [router.query]);

  const waitForRef = async (): Promise<void> => {
    while (!chatBoardRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  const handleSubmit = useCallback(
    async ({ model, prompts, content, setContent }: HandleSubmitParams) => {
      const newChat = await createChatMutation.mutateAsync({
        model,
        prompts,
        initialContent: content,
      });
      setChat(newChat);

      router.push(`?id=${newChat.id}`);
      await waitForRef();
      await chatBoardRef.current!.handleSubmit(content, setContent);

      // ?id=のままだとリロード時におかしな挙動になるため、URLだけ密かに変える
      history.replaceState(undefined, "", `/chats/${newChat.id}`);
    },
    [createChatMutation, router]
  );

  if (chat) {
    return <ChatBoard ref={chatBoardRef} chat={chat} />;
  } else {
    return <NewChatForm handleSubmit={handleSubmit} />;
  }
};
