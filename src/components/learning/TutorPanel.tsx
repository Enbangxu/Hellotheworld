"use client";
import { useEffect, useState, type KeyboardEvent } from "react";
import { SIMPLIFY_EVENT } from "./SimplifyButton";
import type { Locale } from "@/src/config/site";
import type { TutorMode, TutorResponse } from "@/src/lib/learning-schema";
type Message =
  | { role: "user"; text: string }
  | { role: "model"; response: TutorResponse };
const modes: TutorMode[] = [
  "simplify",
  "analogy",
  "example",
  "ask",
  "quiz",
  "diagnose",
];
const copy = {
  zh: {
    provider: "AI 导师由 DeepSeek 提供",
    title: "连续追问",
    placeholder: "输入你的问题或答案…",
    send: "发送",
    clear: "清空对话",
    loading: "DeepSeek 正在回答…",
    actions: [
      "再简单一点",
      "换个生活类比",
      "给我一道例题",
      "用提问引导我",
      "生成一道新题",
      "检查我的答案",
    ],
    errors: {
      UPSTREAM_RATE_LIMIT: "提问太频繁，请稍后再试。",
      UPSTREAM_TIMEOUT: "响应超时，请稍后重试。",
      UPSTREAM_AUTH: "AI 导师配置暂不可用。",
      UPSTREAM_UNAVAILABLE: "AI 导师暂时不可用，课程和练习仍可使用。",
    },
  },
  en: {
    provider: "AI tutor powered by DeepSeek",
    title: "Continue the conversation",
    placeholder: "Type a question or answer…",
    send: "Send",
    clear: "Clear chat",
    loading: "DeepSeek is replying…",
    actions: [
      "Make it simpler",
      "Use a life analogy",
      "Give an example",
      "Guide me with questions",
      "Create a new question",
      "Check my answer",
    ],
    errors: {
      UPSTREAM_RATE_LIMIT: "Too many questions. Please try later.",
      UPSTREAM_TIMEOUT: "The response timed out. Please retry.",
      UPSTREAM_AUTH: "The AI tutor is not configured.",
      UPSTREAM_UNAVAILABLE:
        "The AI tutor is unavailable; lessons and checks still work.",
    },
  },
  ja: {
    provider: "AIチューター：DeepSeek",
    title: "続けて質問",
    placeholder: "質問または回答を入力…",
    send: "送信",
    clear: "会話を消去",
    loading: "DeepSeekが回答中…",
    actions: [
      "もっと簡単に",
      "生活の例えで",
      "例題を出して",
      "質問で導いて",
      "新しい問題",
      "回答を確認",
    ],
    errors: {
      UPSTREAM_RATE_LIMIT: "質問が多すぎます。後でもう一度お試しください。",
      UPSTREAM_TIMEOUT: "応答がタイムアウトしました。",
      UPSTREAM_AUTH: "AIチューターを利用できません。",
      UPSTREAM_UNAVAILABLE:
        "AIチューターは一時停止中ですが、教材と練習は利用できます。",
    },
  },
} as const;
export function TutorPanel({
  topicId,
  locale,
}: {
  topicId: string;
  locale: Locale;
}) {
  const content = copy[locale];
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const run = async (mode: TutorMode, shortcut?: string) => {
    const text = (shortcut ?? question).trim();
    if (loading || (!text && mode === "ask")) return;
    setLoading(true);
    setError("");
    try {
      const history = messages
        .slice(-8)
        .map((message) => ({
          role: message.role,
          text:
            message.role === "user"
              ? message.text
              : [
                  message.response.answer,
                  ...message.response.steps,
                  message.response.keyInsight,
                ].join("\n"),
        }));
      const response = await fetch("/api/learning/tutor", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          locale,
          topicId,
          mode,
          question: text,
          userAnswer: mode === "diagnose" ? text : undefined,
          history,
        }),
      });
      const data = (await response.json()) as TutorResponse & {
        error?: { code?: keyof typeof content.errors };
      };
      if (!response.ok) {
        const code = data.error?.code;
        throw new Error(
          code && code in content.errors
            ? content.errors[code]
            : content.errors.UPSTREAM_UNAVAILABLE,
        );
      }
      setMessages((current) => [
        ...current,
        { role: "user", text: text || content.actions[modes.indexOf(mode)] },
        { role: "model", response: data },
      ]);
      setQuestion("");
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : content.errors.UPSTREAM_UNAVAILABLE,
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const simplify = (event: Event) => {
      if (
        (event as CustomEvent<{ topicId: string }>).detail?.topicId === topicId
      )
        void run("simplify", "我还没懂，请换一个具体例子解释");
    };
    window.addEventListener(SIMPLIFY_EVENT, simplify);
    return () => window.removeEventListener(SIMPLIFY_EVENT, simplify);
  });
  const keyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void run("ask");
    }
  };
  return (
    <aside
      className="rounded-3xl border border-violet-400/30 bg-slate-900 p-5 sm:p-6"
      aria-labelledby="tutor-title"
    >
      <p className="text-xs font-bold text-violet-300">{content.provider}</p>
      <div className="flex items-center justify-between gap-3">
        <h2 id="tutor-title" className="mt-2 text-2xl font-black">
          {content.title}
        </h2>
        <button
          type="button"
          disabled={!messages.length || loading}
          onClick={() => {
            setMessages([]);
            setError("");
          }}
          className="text-sm underline disabled:opacity-40"
        >
          {content.clear}
        </button>
      </div>
      {messages.length > 0 && (
        <ol
          aria-live="polite"
          className="mt-4 max-h-80 space-y-3 overflow-y-auto"
        >
          {messages.map((message, index) => (
            <li
              key={index}
              className={`whitespace-pre-wrap rounded-xl p-3 text-sm ${message.role === "user" ? "ml-6 bg-violet-500/20" : "mr-6 bg-slate-950"}`}
            >
              <strong>{message.role === "user" ? "You" : "DeepSeek"}</strong>
              {message.role === "user" ? (
                <p>{message.text}</p>
              ) : (
                <div className="mt-2 space-y-3">
                  <section>
                    <h3 className="font-bold text-violet-200">简单解释</h3>
                    <p>{message.response.answer}</p>
                  </section>
                  {message.response.steps.length > 0 && (
                    <section>
                      <h3 className="font-bold text-violet-200">小步骤</h3>
                      <ol className="mt-1 list-decimal pl-5">
                        {message.response.steps
                          .slice(0, 3)
                          .map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                      </ol>
                    </section>
                  )}
                  <section className="rounded-lg bg-violet-500/10 p-2">
                    <h3 className="font-bold text-violet-200">
                      最关键的一句话
                    </h3>
                    <p>{message.response.keyInsight}</p>
                  </section>
                  {message.response.followUpQuestion && (
                    <p>
                      <strong className="text-violet-200">可以继续想：</strong>
                      {message.response.followUpQuestion}
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ol>
      )}
      <textarea
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        onKeyDown={keyDown}
        disabled={loading}
        maxLength={1000}
        aria-label={content.placeholder}
        placeholder={content.placeholder}
        className="mt-4 min-h-24 w-full rounded-xl border border-white/20 bg-slate-950 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300"
      />
      <button
        type="button"
        disabled={loading || !question.trim()}
        onClick={() => void run("ask")}
        className="mt-2 rounded-xl bg-violet-400 px-4 py-2 font-bold text-slate-950 disabled:opacity-40"
      >
        {content.send}
      </button>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {modes.map((mode, index) => (
          <button
            disabled={loading}
            type="button"
            key={mode}
            onClick={() => void run(mode, content.actions[index])}
            className="rounded-xl bg-violet-500/20 p-3 text-sm font-bold hover:bg-violet-500/30 disabled:opacity-50"
          >
            {content.actions[index]}
          </button>
        ))}
      </div>
      {loading && (
        <p role="status" className="mt-4 text-slate-300">
          {content.loading}
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-amber-950 p-3 text-amber-200"
        >
          {error}
        </p>
      )}
    </aside>
  );
}
