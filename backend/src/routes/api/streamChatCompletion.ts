import express from "express";
import { ErrorCode, parseError, streamChatCompletion, validateParams } from "../../lib/openai";

const router = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
  res.setHeader("Content-Type", "text/event-stream;charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Accel-Buffering", "no");

  const params = validateParams(req.body);
  if (params == null) {
    const errorCode: ErrorCode = "invalid_argument"
    return res.status(400).send({ errorCode });
  }

  try {
    for await (const data of streamChatCompletion(params)) {
      res.write(data);
    }
  } catch (e) {
    const { status, errorCode } = parseError(e)
    if (status !== 400) { console.error(e) }

    return res.status(status).send({ errorCode });
  }
  res.end();
});

export { router as streamChatCompletionRouter };
