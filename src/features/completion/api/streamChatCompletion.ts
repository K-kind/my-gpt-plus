export type StreamChatDTO = {
  params: {
    model: string;
    messages: { role: "user" | "system" | "assistant"; content: string }[];
  };
};

export async function* streamChatCompletion({ params }: StreamChatDTO) {
  const completion = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stream_chat_completion`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(params),
    }
  );

  const reader = completion.body?.getReader();

  if (!reader) {
    throw new Error("Request failed");
  }

  if (completion.status !== 200) {
    const { errorCode } = await parseError(reader);
    throw new CompletionError(completion.status, errorCode);
  }

  const decoder = new TextDecoder("utf-8");
  let done = false;
  while (!done) {
    const { done: readDone, value } = await reader.read();
    if (readDone) {
      done = readDone;
      reader.releaseLock();
    } else {
      const token = decoder.decode(value, { stream: true });
      yield token;
    }
  }
}

const parseError = async (
  reader: ReadableStreamDefaultReader<Uint8Array>
): Promise<{ errorCode?: ErrorCode }> => {
  const decoder = new TextDecoder("utf-8");

  try {
    const { value } = await reader.read();
    const data = decoder.decode(value, { stream: true });
    const json = JSON.parse(data);
    return { errorCode: json.errorCode as ErrorCode };
  } catch (e) {
    return {};
  }
};

export const ERROR_CODES = [
  "invalid_argument",
  "internal_server_error",
  // 以下OpenAIのエラーコード
  /** トークンが長すぎる */
  "context_length_exceeded",
] as const;

export type ErrorCode = typeof ERROR_CODES[number];

export class CompletionError extends Error {
  constructor(public statusCode: number, public errorCode?: ErrorCode) {
    super();
  }
}
