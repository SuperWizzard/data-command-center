import { databaseSummary } from "@/data/database";
import { entries, disciplines } from "@/data/universe";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { starterQuestions } from "@/data/portfolio";
import {
  ChatMessage,
  MAX_HISTORY,
  MAX_INPUT,
  readChatStream,
  safeChatLink,
} from "@/lib/chatStream";
export default function ChatBot() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false),
    [messages, setMessages] = useState<ChatMessage[]>([]),
    [input, setInput] = useState(""),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(""),
    [storageError, setStorageError] = useState(false);
  const conversation = useRef<string | null>(null),
    session = useRef(crypto.randomUUID()),
    pending = useRef<Promise<void> | null>(null),
    controller = useRef<AbortController | null>(null),
    busy = useRef(false),
    lastSend = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null),
    panel = useRef<HTMLDivElement>(null),
    scroll = useRef<HTMLDivElement>(null),
    trigger = useRef<HTMLButtonElement>(null),
    previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const launch = (e: Event) => {
      previousFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
      setInput(String((e as CustomEvent).detail || "").slice(0, MAX_INPUT));
    };
    window.addEventListener("portfolio:chat", launch);
    return () => {
      window.removeEventListener("portfolio:chat", launch);
      controller.current?.abort();
    };
  }, []);
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    scroll.current?.scrollTo({ top: scroll.current.scrollHeight });
  }, [messages, loading]);
  function close() {
    setOpen(false);
    (previousFocus.current?.isConnected
      ? previousFocus.current
      : trigger.current
    )?.focus();
  }
  async function save(role: ChatMessage["role"], content: string) {
    try {
      if (!conversation.current) {
        if (!pending.current)
          pending.current = (async () => {
            const id = crypto.randomUUID();
            const { error } = await supabase
              .from("chat_conversations")
              .insert({ id, session_id: session.current });
            if (error) throw error;
            conversation.current = id;
          })();
        await pending.current;
      }
      const { error } = await supabase
        .from("chat_messages")
        .insert({ conversation_id: conversation.current, role, content });
      if (error) throw error;
    } catch {
      pending.current = null;
      setStorageError(true);
    }
  }
  async function send() {
    const text = input.trim();
    if (!text || busy.current) return;
    if (text.length > MAX_INPUT) {
      setError(`Please use at most ${MAX_INPUT} characters.`);
      return;
    }
    if (Date.now() - lastSend.current < 3000) {
      setError("Please wait a moment before another question.");
      return;
    }
    busy.current = true;
    lastSend.current = Date.now();
    setLoading(true);
    setError("");
    setInput("");
    const history: ChatMessage[] = [
      ...messages,
      { role: "user" as const, content: text },
    ].slice(-MAX_HISTORY);
    setMessages(history);
    void save("user", text);
    const abort = new AbortController();
    controller.current = abort;
    const timeout = window.setTimeout(() => abort.abort(), 60000);
    let answer = "";
    try {
      const r = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content:
                  "Public portfolio catalogue for reference. " +
                  databaseSummary +
                  " " +
                  entries
                    .map(
                      (e) =>
                        disciplines[e.group].short +
                        " / " +
                        e.title +
                        " / " +
                        e.status,
                    )
                    .join("\n"),
              },
              ...history,
            ],
          }),
          signal: abort.signal,
        },
      );
      if (!r.ok || !r.body)
        throw new Error(
          r.status === 429
            ? "The assistant is busy. Please try again shortly."
            : "The assistant is unavailable. Please try again later.",
        );
      await readChatStream(r.body, (delta) => {
        answer += delta;
        if (answer.length > 24000) {
          abort.abort();
          throw new Error("Response length limit reached.");
        }
        setMessages([...history, { role: "assistant", content: answer }]);
      });
      if (!answer) throw new Error("No answer was received. Please try again.");
    } catch (e) {
      setError(
        abort.signal.aborted
          ? "The response stopped or timed out. You can send another question."
          : e instanceof Error
            ? e.message
            : "Connection error. Please try again.",
      );
    } finally {
      if (answer) void save("assistant", answer);
      window.clearTimeout(timeout);
      busy.current = false;
      setLoading(false);
      controller.current = null;
      inputRef.current?.focus();
    }
  }
  if (pathname === "/admin") return null;
  return (
    <>
      {!open && (
        <button
          ref={trigger}
          className="fixed bottom-5 right-5 z-50 rounded-full bg-primary text-primary-foreground p-4 shadow-lg"
          aria-label="Open portfolio assistant"
          onClick={() => {
            previousFocus.current = document.activeElement as HTMLElement;
            setOpen(true);
          }}
        >
          <MessageCircle size={23} />
        </button>
      )}
      {open && (
        <div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-title"
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
            if (e.key === "Tab") {
              const nodes = panel.current?.querySelectorAll<HTMLElement>(
                "button:not(:disabled), input:not(:disabled), a[href]",
              );
              if (!nodes?.length) return;
              const first = nodes[0],
                last = nodes[nodes.length - 1];
              if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
              } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }
          }}
          className="fixed bottom-3 right-3 z-50 w-[calc(100%-1.5rem)] sm:w-[410px] h-[min(680px,90dvh)] flex flex-col border border-border bg-background shadow-2xl rounded-xl overflow-hidden"
        >
          <header className="flex justify-between items-center p-4 border-b border-border">
            <div className="flex gap-2 items-center">
              <Bot size={20} />
              <h2 id="chat-title" className="text-sm font-semibold">
                Explore Sobhe's story
              </h2>
            </div>
            <button
              aria-label="Close assistant"
              className="p-2"
              onClick={close}
            >
              <X size={18} />
            </button>
          </header>
          <div className="px-4 py-3 text-[10px] text-muted-foreground border-b border-border leading-relaxed">
            AI can make mistakes.{" "}
            <a href="/#story" className="underline" onClick={close}>
              Read the latest portfolio
            </a>
            . Conversations are stored. Avoid personal or confidential
            information.
          </div>
          <div
            ref={scroll}
            className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4"
          >
            {!messages.length && (
              <>
                <p className="text-sm text-muted-foreground">
                  Ask about Sobhe's experience, leadership or projects.
                </p>
                {starterQuestions.slice(0, 4).map((q) => (
                  <button
                    key={q}
                    className="block text-left text-xs p-3 border border-border w-full hover:border-primary"
                    onClick={() => {
                      setInput(q);
                      inputRef.current?.focus();
                    }}
                  >
                    {q}
                  </button>
                ))}
              </>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed p-3 rounded-lg break-words ${m.role === "user" ? "bg-primary/15 ml-5" : "bg-muted/60 mr-2"}`}
              >
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                  {m.role === "user" ? "You" : "Portfolio assistant"}
                </p>
                <div className="chat-markdown">
                  <ReactMarkdown
                    skipHtml
                    urlTransform={(url) => safeChatLink(url) || ""}
                    components={{
                      a: ({ href, children }) =>
                        href ? (
                          <a
                            href={href}
                            target={
                              href.startsWith("https:") ? "_blank" : undefined
                            }
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ) : (
                          <span>{children}</span>
                        ),
                      img: () => null,
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <p role="status" className="text-xs text-muted-foreground">
                {messages[messages.length - 1]?.role === "assistant"
                  ? "Writing..."
                  : "Thinking..."}
              </p>
            )}
            {error && (
              <p role="alert" className="text-xs text-red-300">
                {error}
              </p>
            )}
            {storageError && (
              <p role="status" className="text-xs text-muted-foreground">
                Some messages could not be saved. Your conversation can
                continue.
              </p>
            )}
          </div>
          <form
            className="p-3 border-t border-border"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <label className="sr-only" htmlFor="portfolio-question">
              Your question
            </label>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                id="portfolio-question"
                value={input}
                maxLength={MAX_INPUT}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What would you like to know?"
                className="min-w-0 flex-1 rounded-md bg-muted px-3 py-2 text-sm"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send question"
                className="p-3 bg-primary text-white rounded-md"
              >
                <Send size={17} />
              </button>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
              <span>Last {MAX_HISTORY} messages sent as context</span>
              {loading ? (
                <button
                  type="button"
                  onClick={() => controller.current?.abort()}
                >
                  Stop response
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMessages([]);
                    conversation.current = null;
                    pending.current = null;
                    setError("");
                    setStorageError(false);
                  }}
                >
                  New conversation
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
}
