import {
  streamChatCompletion,
  StreamChatDTO,
} from "@/features/completion/api/streamChatCompletion";
import { useState } from "react";

type StartOptions = {
  params: StreamChatDTO["params"];
  onGetToken?: (token: string) => void;
  onSuccess?: (content: string) => void;
};

export const useStreamChatCompletion = () => {
  const [content, setContent] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const start = async ({ params, onGetToken, onSuccess }: StartOptions) => {
    setIsLoading(true);

    let currentContent = "";
    try {
      const generator = streamChatCompletion({ params });
      for await (let token of generator) {
        currentContent = currentContent + token;
        setContent(currentContent);
        onGetToken?.(token);
      }
      onSuccess?.(currentContent);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    content,
    setContent,
    isLoading,
    start,
  };
};
