export type Message = {
  id: string;
  chatId: string;
  userId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
};
