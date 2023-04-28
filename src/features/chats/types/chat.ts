export const ASSIGNABLE_MODEL = {
  THREE_TURBO: "gpt-3.5-turbo",
  FOUR: "gpt-4",
} as const;

export type AssignableModel =
  (typeof ASSIGNABLE_MODEL)[keyof typeof ASSIGNABLE_MODEL];

export type Chat = {
  id: string;
  userId: string;
  model: AssignableModel;
  prompts: ChatPrompt[];
  title: string;
  createdAt: Date;
};

export type ChatPrompt = { id: string; title: string; content: string };

export const MODEL_INFO = {
  [ASSIGNABLE_MODEL.THREE_TURBO]: {
    name: "GPT-3.5",
    detailName: "GPT-3.5 (Turbo)",
  },
  [ASSIGNABLE_MODEL.FOUR]: {
    name: "GPT-4",
    detailName: "GPT-4",
  },
} as const satisfies {
  [key in AssignableModel]: { name: string; detailName: string };
};
