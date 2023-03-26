import { ChatDeleteButton } from "@/features/chats/components/ChatDeleteButton";
import { Chat, MODEL_INFO } from "@/features/chats/types/chat";
import { format } from "@/shared/utils/date";
import { ActionIcon, Box, Flex, Table } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import Link from "next/link";

type Props = {
  chats: Chat[];
  sort: "asc" | "desc";
  toggleSort: () => void;
  loading: boolean;
};

export const ChatListTable = ({ chats, sort, toggleSort, loading }: Props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th style={{ width: "50%" }}>タイトル</th>
          <th>モデル</th>
          <th style={{ width: "180px" }}>
            <Flex align="center">
              作成日時
              <ActionIcon
                variant="subtle"
                ml={2}
                onClick={toggleSort}
                disabled={loading}
              >
                {sort === "desc" ? (
                  <IconArrowDown size="1rem" />
                ) : (
                  <IconArrowUp size="1rem" />
                )}
              </ActionIcon>
            </Flex>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {chats.map((chat) => (
          <tr key={chat.id}>
            <td style={{ padding: 0 }}>
              <Box
                component={Link}
                href={`/chats/${chat.id}`}
                p={10}
                h="100%"
                sx={(theme) => ({
                  display: "block",
                  textDecoration: "none",
                  "&:hover": { backgroundColor: theme.colors.blue[0] },
                })}
                c="blue"
              >
                {chat.title}
              </Box>
            </td>
            <td>{MODEL_INFO[chat.model].name}</td>
            <td>{format(chat.createdAt, "yyyy/MM/dd HH:mm")}</td>
            <td>
              <ChatDeleteButton id={chat.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
