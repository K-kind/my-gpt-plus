import { ChatBoard } from "@/features/chats/components/ChatBoard";
import { useChat } from "@/features/chats/hooks/useChat";

type Props = { id: string };

export const ChatDetailsPage = ({ id }: Props) => {
  const chatQuery = useChat({ id });

  return <ChatBoard chat={chatQuery.data!} />;
};
