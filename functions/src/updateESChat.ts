import * as functions from "firebase-functions";
import { ChatData, CHATS_INDEX, ESChat } from "./types/chat";
import { getEsClient } from "./lib/elasticsearch";

process.env.TZ = "Asia/Tokyo";

export const updateESChat = functions
  .region("asia-northeast1")
  .firestore.document("chats/{chatId}")
  .onWrite(async (change, context) => {
    const esClient = getEsClient();
    const chatId = context.params.chatId;

    try {
      if (!change.after.exists) {
        await esClient.delete({ index: CHATS_INDEX, id: chatId });
        return;
      }

      const esChat = (
        await esClient
          .get({ index: CHATS_INDEX, id: chatId })
          .catch(() => undefined)
      )?._source as ESChat | undefined;

      const chat = change.after.data() as ChatData;

      const newEsChat: ESChat = {
        ...esChat,
        id: chatId,
        userId: chat.userId,
        title: chat.title,
        messages: esChat?.messages ?? [],
        prompts: chat.prompts.map((prompt) => ({
          title: prompt.title,
          content: prompt.content,
        })),
        createdAt: chat.createdAt.toDate().toISOString(),
      };

      await esClient.index({
        index: CHATS_INDEX,
        id: chatId,
        document: newEsChat,
      });
    } catch (e) {
      functions.logger.error(e);
    }
  });
