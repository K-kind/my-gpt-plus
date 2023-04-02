import * as functions from "firebase-functions";
import { doCreateChatCompletion, validateParams } from "./lib/openai";

export const createChatCompletion = functions
  .region("asia-northeast1")
  .https.onCall(async (reqData, context) => {
    const params = validateParams(reqData);
    if (params == null) {
      const message = "Parameter is invalid";
      throw new functions.https.HttpsError("invalid-argument", message);
    }

    const { data: rawData, error } = await doCreateChatCompletion(params);
    if (rawData == null) {
      functions.logger.error(error, { structuredData: true });
      const message = "Internal server error";
      throw new functions.https.HttpsError("internal", message);
    }

    const data = {
      id: rawData.id,
      model: rawData.model,
      usage: rawData.usage,
      choices: rawData.choices,
    };

    return { data };
  });
