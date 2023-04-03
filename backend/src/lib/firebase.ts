import { Request } from "express";
import admin from "firebase-admin";

const initApp = () => {
  if (admin.apps.length !== 0) return;

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FB_SA_PROJECT_ID!,
      privateKey: process.env.FB_SA_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      clientEmail: process.env.FB_SA_CLIENT_EMAIL!,
    }),
  });
};

export type User = {
  uid: string;
};

export const getUser = async (req: Request): Promise<User | undefined> => {
  initApp();
  const token = getBearerToken(req);
  if (token == undefined) return;

  return await verifyToken(token);
};

const getBearerToken = (req: Request) => {
  if (!req.headers.authorization) return;

  const [head, token] = req.headers.authorization.split(" ");
  if (head !== "Bearer") return;

  return token;
};

const verifyToken = async (token: string) => {
  const decodedToken = await admin.auth().verifyIdToken(token);
  return { uid: decodedToken.uid };
};
