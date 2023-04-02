// indicesを作成する
import { Client } from "@elastic/elasticsearch";
import { chatBody } from "./indices/chat";

const client = new Client({
  node: "http://localhost:9200",
  auth: {
    username: 'elastic',
    password: 'password'
  }
});

const makeElastic = async () => {
  try {
    // indexが存在する場合は削除
    const isExists = await client.indices.exists({
      index: chatBody.index,
    });

    if (isExists) {
      console.warn(`Already exists index: ${chatBody.index}, so deleting it.`);
      await client.indices.delete({
        index: chatBody.index,
      });
    }

    await client.indices.create(chatBody);
    console.info("○○○○ 成功 ○○○○");
  } catch (e) {
    console.error("XXXXXX 失敗 XXXXXX");
    console.error(e);
  }
};

makeElastic();
