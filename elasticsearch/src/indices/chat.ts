import { IndicesCreateRequest } from "@elastic/elasticsearch/lib/api/types";

export const chatIndexName = "chats";

export const chatBody: IndicesCreateRequest = {
  index: chatIndexName,
  settings: {
    analysis: {
      tokenizer: {
        ngram_ja_tokenizer: {
          type: "ngram",
          min_gram: 2,
          max_gram: 3,
          token_chars: ["letter", "digit"],
        },
      },
      analyzer: {
        ngram_ja: {
          type: "custom",
          tokenizer: "ngram_ja_tokenizer",
        },
      },
    },
    refresh_interval: "60s"
  },
  mappings: {
    properties: {
      id: { type: "keyword" },
      userId: { type: "keyword" },
      title: { type: "text", analyzer: "ngram_ja" },
      prompts: {
        type: "nested",
        properties: {
          title: { type: "text", analyzer: "ngram_ja" },
          content: { type: "text", analyzer: "ngram_ja" },
        },
      },
      messages: {
        type: "nested",
        properties: {
          id: { type: "keyword" },
          content: { type: "text", analyzer: "ngram_ja" },
        },
      },
      createdAt: { type: "date", format: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" },
    },
  },
};
