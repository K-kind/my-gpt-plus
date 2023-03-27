import express from 'express';

const router = express.Router();

router.post('/', (req: express.Request, res: express.Response) => {
  try {
    res.status(200).json({ message: "登録しました" });
  } catch (error) {
    // res.status(400).json({ message: error.message });
  }
});

export { router as  streamChatCompletionRouter }
