import {
  streamChatCompletion,
  StreamChatDTO,
} from "@/features/completion/api/streamChatCompletion";
import { useState } from "react";

type StartOptions = {
  params: StreamChatDTO["params"];
  onSuccess: (content: string) => void;
};

export const useStreamChatCompletion = () => {
  const [content, setContent] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const start = async ({ params, onSuccess }: StartOptions) => {
    setIsLoading(true);

    let currentContent = "";
    try {
      const generator = streamChatCompletion({ params });
      for await (let token of generator) {
        currentContent = currentContent + token;
        setContent(currentContent);
      }
      onSuccess(currentContent);
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
