import { Chat, MODEL_INFO } from "@/features/chats/types/chat";

export const getModelInfo = (chat: Chat) => {
  return MODEL_INFO[chat.model];
};
