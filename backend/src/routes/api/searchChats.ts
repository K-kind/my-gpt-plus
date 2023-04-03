import express from "express";
import { searchChat } from "../../lib/elasticsearch";
import { getUser } from "../../lib/firebase";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const user = await getUser(req);
    if (user == undefined) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const word = req.query.word;
    if (typeof word !== "string") {
      return res.status(400).send({ message: "Bad Request" });
    }

    const result = await searchChat(word, user.uid);
    res.json({ ...result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as searchChatsRouter };
