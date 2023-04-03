import { useSearchChat } from "@/features/chats/hooks/useSearchChat";
import { NavLink, Text } from "@mantine/core";
import Link from "next/link";
import styled from "@emotion/styled";

type Props = {
  word: string;
};

export const ChatSearchList = ({ word }: Props) => {
  const searchChatQuery = useSearchChat({
    word,
    config: {
      keepPreviousData: true,
    },
  });

  return (
    <>
      {searchChatQuery.data!.data.map((chat) => (
        <NavLink
          key={chat.id}
          label={
            <Text fz="sm" my={2}>
              {chat.title}
            </Text>
          }
          description={
            <TextWithHighlight
              // @ts-ignore
              dangerouslySetInnerHTML={{ __html: chat.highlight?.body ?? "" }}
              mih={8}
            />
          }
          component={Link}
          href={`/chats/${chat.id}`}
        />
      ))}
    </>
  );
};

const TextWithHighlight = styled(Text)`
  em {
    background-color: rgb(255, 236, 153);
    font-style: normal;
  }
`;
