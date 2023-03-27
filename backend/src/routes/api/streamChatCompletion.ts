import express from "express";
import { streamChatCompletion, validateParams } from "../../lib/openai";

const router = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/event-stream;charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Accel-Buffering", "no");
  res.setHeader("Connection", "keep-alive");

  const params = validateParams(req.body);
  if (params == null) {
    throw new Error("Invalid argument");
  }

  for await (const data of streamChatCompletion(params)) {
    res.write(data);
  }
  res.end();
});

export { router as streamChatCompletionRouter };
