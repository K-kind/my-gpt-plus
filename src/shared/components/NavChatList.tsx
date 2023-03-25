import { NavLink } from "@mantine/core";
import Link from "next/link";
import { IconMessageDots } from "@tabler/icons-react";
import { useChatList } from "@/features/chats/hooks/useChatList";

type Props = { pageId: string | undefined };

export const NavChatList = ({ pageId }: Props) => {
  const chatListQuery = useChatList();

  return (
    <>
      {chatListQuery.data!.map((chat) => (
        <NavLink
          key={chat.id}
          label={chat.title}
          component={Link}
          active={pageId === chat.id}
          href={`/chats/${chat.id}`}
          icon={<IconMessageDots size="1rem" stroke={1.5} />}
          sx={{ borderRadius: 6 }}
          my={6}
        />
      ))}
    </>
  );
};
