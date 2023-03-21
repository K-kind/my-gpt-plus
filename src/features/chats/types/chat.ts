export const ASSIGNABLE_MODEL = {
  THREE_TURBO: "gpt-3.5-turbo",
  FOUR: "gpt-4",
} as const;

export type AssignableModel =
  typeof ASSIGNABLE_MODEL[keyof typeof ASSIGNABLE_MODEL];

export type Chat = {
  id: string;
  userId: string;
  model: AssignableModel;
  systemContent: string | null;
  title: string;
  createdAt: Date;
};
