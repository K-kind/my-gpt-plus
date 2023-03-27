import type { NextApiRequest, NextApiResponse } from "next";
import { streamChatCompletion, validateParams } from "@/server/lib/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    throw new Error("Invalid request");
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/event-stream;charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Accel-Buffering", "no");

  const params = validateParams(req.body);
  if (params == null) {
    throw new Error("Invalid argument");
  }

  for await (const data of streamChatCompletion(params)) {
    res.write(data);
  }
  res.end();
}
