import { ChatListTable } from "@/features/chats/components/ChatListTable";
import { useChatList } from "@/features/chats/hooks/useChatList";
import { Box, Button } from "@mantine/core";
import { useEffect, useState } from "react";

type PageState = {
  after: Date | undefined;
  before: Date | undefined;
  sort: "desc" | "asc";
};

const PER_PAGE = 12;

export const ChatList = () => {
  const [pageState, setPageState] = useState<PageState>({
    sort: "desc",
    after: undefined,
    before: undefined,
  });
  const [firstChatId, setFirstChatId] = useState<string>();

  const chatListQuery = useChatList({
    perPage: PER_PAGE,
    sort: pageState.sort,
    after: pageState.after,
    before: pageState.before,
    config: {
      // 次ページに行くとき、ロード完了まで前のデータを表示してチラつきをなくす
      keepPreviousData: true,
    },
  });

  const chats = chatListQuery.data!;

  // 最初のページかどうかが分かるようにしなければ、戻ってきた時に前へを表示してしまう
  // onSuccessでやるとstate変更が反映されなかったため、useEffect
  useEffect(() => {
    if (firstChatId == undefined) {
      setFirstChatId(chats[0]?.id);
    }
  }, [chats, firstChatId]);

  const handlePrev = () => {
    if (chats.length > 0) {
      setPageState(({ sort }) => ({
        sort,
        after: undefined,
        before: chats[0].createdAt,
      }));
    } else if (pageState.after) {
      // 次に行ったが、0件だった時
      setPageState(({ sort, after }) => {
        // 1秒ずらして前のページに戻る
        const before = new Date(after!.getTime() + (sort === "desc" ? -1 : 1));
        return { sort, after: undefined, before };
      });
    }
  };
  const handleNext = () => {
    setPageState(({ sort }) => ({
      sort,
      after: chats[chats.length - 1].createdAt,
      before: undefined,
    }));
  };

  const toggleSort = () => {
    setPageState(({ sort }) => ({
      sort: sort === "desc" ? "asc" : "desc",
      after: undefined,
      before: undefined,
    }));
    setFirstChatId(undefined);
  };

  return (
    <Box>
      <Box mih={300}>
        <ChatListTable
          chats={chats}
          sort={pageState.sort}
          toggleSort={toggleSort}
          loading={chatListQuery.isLoading}
        />
      </Box>

      <Box mt="lg">
        <Button
          disabled={
            chatListQuery.isLoading || (chats[0] && chats[0].id === firstChatId)
          }
          onClick={handlePrev}
        >
          前へ
        </Button>
        <Button
          disabled={chatListQuery.isLoading || chats.length < PER_PAGE}
          onClick={handleNext}
          ml="sm"
        >
          次へ
        </Button>
      </Box>
    </Box>
  );
};
