import * as functions from "firebase-functions";
import { CHATS_INDEX, ESChat } from "./types/chat";
import { getEsClient } from "./lib/elasticsearch";
import { MessageData } from "./types/message";

process.env.TZ = "Asia/Tokyo";

export const updateESMessage = functions
  .region("asia-northeast1")
  .firestore.document("chats/{chatId}/messages/{messageId}")
  .onWrite(async (change, context) => {
    const esClient = getEsClient();
    const chatId = context.params.chatId;
    const messageId = context.params.messageId;

    try {
      // Chat作成に先立つ場合
      if (!(await esClient.exists({ index: CHATS_INDEX, id: chatId }))) {
        await esClient.index({
          index: CHATS_INDEX,
          id: chatId,
          document: { messages: [] },
        });
      }

      const esChat = (
        await esClient
          .get({ index: CHATS_INDEX, id: chatId })
          .catch(() => undefined)
      )?._source as ESChat;

      if (!change.after.exists) {
        const updatedEsChat: Partial<ESChat> = {
          messages: esChat.messages.filter(({ id }) => id !== messageId),
        };
        await esClient.update({
          index: CHATS_INDEX,
          id: chatId,
          doc: updatedEsChat,
        });
        return;
      }

      const message = change.after.data() as MessageData;
      const esMessage = { id: messageId, content: message.content };

      const updatedEsChat: Partial<ESChat> = {
        messages: esChat.messages.some(({ id }) => id === messageId)
          ? esChat.messages.map((m) => (m.id === messageId ? esMessage : m))
          : [...esChat.messages, esMessage],
      };

      await esClient.update({
        index: CHATS_INDEX,
        id: chatId,
        doc: updatedEsChat,
      });
    } catch (e) {
      functions.logger.error(e);
    }
  });
