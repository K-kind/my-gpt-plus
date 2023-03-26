export type Prompt = {
  id: string;
  userId: string;
  title: string;
  content: string;
  seq: number;
  isDefault: boolean;
  createdAt: Date;
};
