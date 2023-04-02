import { Timestamp } from "firebase-admin/firestore";

export const CHATS_INDEX = "chats";

export type ChatData = {
  id: string;
  userId: string;
  title: string;
  prompts: { title: string; content: string }[];
  createdAt: Timestamp;
};

export type ESChat = {
  id: string;
  userId: string;
  title: string;
  messages: { id: string; content: string }[];
  prompts: { title: string; content: string }[];
  createdAt: string;
};
