import express from "express";
import { searchChatsRouter } from "./searchChats";
import { streamChatCompletionRouter } from "./streamChatCompletion";

const router = express.Router();

router.use("/stream_chat_completion", streamChatCompletionRouter);
router.use("/search_chats", searchChatsRouter);

export default router;
