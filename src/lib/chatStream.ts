export type ChatMessage = { role: "user" | "assistant"; content: string };
export const MAX_INPUT = 2000;
export const MAX_HISTORY = 20;
export function safeChatLink(href: string): string | undefined {
  if (href.startsWith("/") && !href.startsWith("//") && !href.includes("\\"))
    return href;
  if (/^#[a-z0-9-]+$/i.test(href)) return href;
  try {
    const url = new URL(href);
    if (["https:", "mailto:"].includes(url.protocol)) return url.href;
  } catch {
    /* Ignore unsafe links. */
  }
}
export async function readChatStream(
  stream: ReadableStream<Uint8Array>,
  onDelta: (text: string) => void,
) {
  const reader = stream.getReader(),
    decoder = new TextDecoder();
  let buffer = "",
    finished = false;
  const line = (value: string) => {
    if (!value.startsWith("data:")) return;
    const data = value.slice(5).trim();
    if (data === "[DONE]") {
      finished = true;
      return;
    }
    if (!data) return;
    try {
      const payload = JSON.parse(data);
      if (payload.error)
        throw new Error("The assistant could not finish. Please try again.");
      const delta = payload.choices?.[0]?.delta?.content;
      if (typeof delta === "string") onDelta(delta);
    } catch (e) {
      if (e instanceof SyntaxError)
        throw new Error("The response was interrupted. Please try again.");
      throw e;
    }
  };
  try {
    while (!finished) {
      const { done, value } = await reader.read();
      buffer += done
        ? decoder.decode()
        : decoder.decode(value, { stream: true });
      let newline: number;
      while (!finished && (newline = buffer.indexOf("\n")) >= 0) {
        line(buffer.slice(0, newline).replace(/\r$/, ""));
        buffer = buffer.slice(newline + 1);
      }
      if (done) {
        if (buffer.trim() && !finished) line(buffer);
        break;
      }
    }
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}
