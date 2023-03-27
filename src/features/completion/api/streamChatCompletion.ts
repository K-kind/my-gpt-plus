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

  if (completion.status !== 200 || !reader) {
    throw new Error("Request failed");
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
