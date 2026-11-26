import { describe, expect, it } from "vitest";
import { readChatStream, safeChatLink } from "@/lib/chatStream";
describe("assistant safety and streaming", () => {
  it("rejects executable, protocol-relative and malformed links", () => {
    for (const url of [
      "javascript:alert(1)",
      "data:text/html,hi",
      "//evil.example",
      "/\\evil.example",
      "not a URL",
    ])
      expect(safeChatLink(url)).toBeUndefined();
    expect(safeChatLink("/projects/knowledge-hub")).toBe(
      "/projects/knowledge-hub",
    );
    expect(safeChatLink("https://example.com")).toBe("https://example.com/");
  });
  it("handles byte splits, CRLF, UTF-8 and stops at DONE", async () => {
    const bytes = new TextEncoder().encode(
      'data: {"choices":[{"delta":{"content":"café"}}]}\r\n\r\ndata: [DONE]\n' +
        'data: {"choices":[{"delta":{"content":"ignored"}}]}\n',
    );
    const stream = new ReadableStream<Uint8Array>({
      start(c) {
        for (const byte of bytes) c.enqueue(new Uint8Array([byte]));
        c.close();
      },
    });
    let result = "";
    await readChatStream(stream, (t) => (result += t));
    expect(result).toBe("café");
  });
  it("handles a final line without a newline", async () => {
    const stream = new ReadableStream<Uint8Array>({
      start(c) {
        c.enqueue(
          new TextEncoder().encode(
            'data: {"choices":[{"delta":{"content":"ok"}}]}',
          ),
        );
        c.close();
      },
    });
    let result = "";
    await readChatStream(stream, (t) => (result += t));
    expect(result).toBe("ok");
  });
  it("reports malformed events", async () => {
    const stream = new ReadableStream<Uint8Array>({
      start(c) {
        c.enqueue(new TextEncoder().encode("data: broken\n"));
        c.close();
      },
    });
    await expect(readChatStream(stream, () => {})).rejects.toThrow(
      "interrupted",
    );
  });
});
