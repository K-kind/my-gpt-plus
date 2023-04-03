import { Client } from "@elastic/elasticsearch";

let esClient: Client;

const getClient = () => {
  if (esClient == undefined) {
    esClient = new Client({
      node: process.env.ELASTIC_NODE!,
      auth: {
        username: process.env.ELASTIC_USER_NAME!,
        password: process.env.ELASTIC_PASSWORD!,
      },
    });
  }

  return esClient;
};

const CHATS_INDEX = "chats";

type ChatSearchSource = {
  title: string;
};

type ChatSearchData = {
  id: string;
  title: string;
  highlight: {
    key: "title" | "messages.content" | "prompts.title";
    body: string;
  } | null;
};

type ChatSearchResponse = {
  total: number;
  data: ChatSearchData[];
};

export const searchChat = async (
  word: string,
  userId: string
): Promise<ChatSearchResponse> => {
  const result = await getClient().search<ChatSearchSource>({
    index: CHATS_INDEX,
    size: 16,
    _source: ["title"],
    highlight: {
      fields: {
        title: {},
        "messages.content": {},
        "prompts.title": {},
      },
      fragment_size: 80,
      number_of_fragments: 1,
    },
    query: {
      bool: {
        must: [
          {
            match: {
              userId: {
                query: userId,
              },
            },
          },
          {
            bool: {
              should: [
                {
                  match: {
                    title: {
                      query: word,
                      analyzer: "ngram_ja",
                    },
                  },
                },
                {
                  nested: {
                    path: "messages",
                    query: {
                      match: {
                        "messages.content": {
                          query: word,
                          analyzer: "ngram_ja",
                        },
                      },
                    },
                  },
                },
                {
                  nested: {
                    path: "prompts",
                    query: {
                      match: {
                        "prompts.title": {
                          query: word,
                          analyzer: "ngram_ja",
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  const chats = result.hits.hits.map<ChatSearchData>((hit) => ({
    id: hit._id,
    title: hit._source?.title ?? "",
    highlight: selectHighlight(hit.highlight),
  }));

  const total =
    typeof result.hits.total === "number"
      ? result.hits.total
      : result.hits.total?.value;

  return {
    total: total!,
    data: chats,
  };
};

/** 複数のhighlightがあるとき、messageを優先的に1つだけ選ぶ */
const selectHighlight = (highlight: Record<string, string[]> | undefined) => {
  if (highlight == undefined) return null;

  if (highlight["messages.content"]) {
    return {
      key: "messages.content",
      body: highlight["messages.content"][0],
    } as const;
  }
  if (highlight["title"]) {
    return { key: "title", body: highlight["title"][0] } as const;
  }
  if (highlight["prompts.title"]) {
    return {
      key: "prompts.title",
      body: highlight["prompts.title"][0],
    } as const;
  }
  return null;
};
