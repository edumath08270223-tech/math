"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    // @ts-ignore - bypassing v4 type mismatch
    sendMessage({ role: "user", content: input });
    setInput("");
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-start p-4 w-full max-w-4xl mx-auto gap-8 h-[calc(100vh-200px)]">
      <div className="border-8 border-yellow-800/80 p-6 w-full h-full rounded-sm flex flex-col shadow-2xl relative bg-teal-900 border-double">
        <h1 className="text-4xl text-yellow-300 drop-shadow-md font-nanum text-center border-b-2 border-dashed border-white/30 pb-4 mb-4">
          👨‍🏫 AI 수학 선생님에게 질문하기
        </h1>

        <div className="flex-1 overflow-y-auto flex flex-col gap-6 pr-2 pb-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/50 text-2xl font-nanum text-center gap-4">
              <span>수학 문제나 개념이 헷갈리나요?</span>
              <span>무엇이든 물어보세요! 친절하게 설명해 줄게요.</span>
            </div>
          ) : (
            (messages as any[]).map((m) => (
              <div
                key={m.id}
                className={`flex flex-col max-w-[80%] ${
                  m.role === "user" ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <span className="text-sm text-yellow-200 mb-1 font-nanum">
                  {m.role === "user" ? "학생" : "AI 선생님"}
                </span>
                <div
                  className={`px-4 py-3 rounded-2xl text-xl font-nanum whitespace-pre-wrap leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-yellow-300 text-teal-900 rounded-tr-none"
                      : "bg-white/10 text-white border border-white/20 rounded-tl-none"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="self-start text-white/60 font-nanum text-xl flex items-center gap-2">
              <span className="animate-pulse">선생님이 타이핑 중...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-4 flex gap-4 pt-4 border-t-2 border-dashed border-white/30"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="수학 질문을 여기에 입력하세요..."
            className="flex-1 bg-white/10 border-2 border-white/30 rounded-xl px-4 py-3 text-2xl text-white font-nanum placeholder-white/40 focus:outline-none focus:border-yellow-300 transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-8 py-3 bg-yellow-300 text-teal-900 font-bold text-2xl rounded-xl hover:bg-yellow-400 transition-all disabled:opacity-50 font-nanum shadow-md"
          >
            질문하기
          </button>
        </form>
      </div>
    </div>
  );
}
