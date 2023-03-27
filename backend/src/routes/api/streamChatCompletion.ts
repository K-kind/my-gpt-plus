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
    return res.status(400).send({ message: "Invalid argument" });
  }

  try {
    for await (const data of streamChatCompletion(params)) {
      res.write(data);
    }
  } catch (e) {
    return res.status(500).send({ message: "Internal server error" });
  }
  res.end();
});

export { router as streamChatCompletionRouter };
