import express from 'express';
import { streamChatCompletionRouter } from './streamChatCompletion';

const router = express.Router();

router.use('/stream_chat_completion', streamChatCompletionRouter);

export default router;
