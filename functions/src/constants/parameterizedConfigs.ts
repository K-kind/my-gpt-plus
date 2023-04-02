import { defineString } from "firebase-functions/params";

export const parameterizedConfigs = {
  OPEN_AI_API_KEY: defineString("OPEN_AI_API_KEY"),
};
