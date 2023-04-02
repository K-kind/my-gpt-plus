import * as functions from "firebase-functions";
import { CHATS_INDEX } from "./types/chat";
import { getEsClient } from "./lib/elasticsearch";
import { MessageData } from "./types/message";

process.env.TZ = "Asia/Tokyo";

/** 更新は難しそうなので、messagesは追加していく形にする（重複は許容し、更新は考えない） */
export const updateESMessage = functions
  .region("asia-northeast1")
  .firestore.document("chats/{chatId}/messages/{messageId}")
  .onCreate(async (change, context) => {
    const esClient = getEsClient();
    const chatId = context.params.chatId;
    const messageId = context.params.messageId;

    try {
      const message = change.data() as MessageData;
      const esMessage = { id: messageId, content: message.content };

      await esClient.update({
        index: CHATS_INDEX,
        id: chatId,
        script: {
          source: "ctx._source.messages.add(params.message)",
          lang: "painless",
          params: {
            message: esMessage,
          },
        },
        upsert: {
          messages: [esMessage],
        },
        refresh: true,
      });
    } catch (e) {
      functions.logger.error(e);
    }
  });
