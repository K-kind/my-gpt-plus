import { Client } from "@elastic/elasticsearch";

export const getEsClient = () => {
  return new Client({
    node: process.env.ELASTIC_NODE!,
    auth: {
      username: process.env.ELASTIC_USER_NAME!,
      password: process.env.ELASTIC_PASSWORD!,
    },
  });
};
