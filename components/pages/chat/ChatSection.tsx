"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  MoreHorizontal,
  Search,
  AlertCircle,
} from "lucide-react";
import { chat } from "@/lib/api";
import { cn } from "@/lib/utills"; // Note: keeping typo 'utills' as per original file
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
  confidence?: string;
  metadata?: any;
  timestamp: Date;
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am your Cricket Agent. How can I assist you today with match insights, rules, or statistics?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

useEffect(() => {
  const storedSession =
    localStorage.getItem("cagent_current_session_id");

  if (storedSession) {
    setSessionId(storedSession);
  } else {
    const newSession = `chat_sess_${Date.now()}`;
    setSessionId(newSession);
  }
}, []);


  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const payload = {
        message: currentInput,
        session_id: sessionId || `chat_sess_${Date.now()}`,

        client_id: "cricket_web_app_v2",
        user_id: "user_internal_001",
      };

      const res = await chat(payload);
console.log("CHAT RESPONSE:", res);

if (res?.status === "SUCCESS" && res?.data?.response) {
  const assistantMessage: Message = {
    role: "assistant",
    content: res.data.response,
    confidence: res.confidence,
    metadata: {
      rag: res.data.context_info,
      processing_time: res.meta?.processing_time_ms,
      id: res.meta?.request_id,
    },
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, assistantMessage]);
} else {
  const errorText =
    res?.errors?.[0] ||
    "The server returned an unexpected response.";

  setMessages((prev) => [
    ...prev,
    { role: "assistant", content: errorText, timestamp: new Date() },
  ]);
}

    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "I apologize, but I encountered a disruption in my neural connection. Please check your network and try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-[850px] max-w-7xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl relative overflow-hidden ring-1 ring-white/10">
      {/* Header Area */}
      <div className="bg-[#11074b]/80 px-6 py-4 flex items-center justify-between z-10 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#ef660f] flex items-center justify-center text-white">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg leading-none">
              Cricket AI Agent
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <p className="text-white/60 text-xs font-medium uppercase tracking-wider">
                System Online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-transparent custom-scrollbar"
      >
        {messages.map((m, i) => {
          const isUser = m.role === "user";
          return (
            <div
              key={i}
              className={cn(
                "flex flex-col max-w-[85%] md:max-w-[75%]",
                isUser ? "ml-auto items-end" : "mr-auto items-start",
              )}
            >
              <div
                className={cn(
                  "px-5 py-4 text-[15px] leading-relaxed",
                  isUser
                    ? "bg-[#ef660f] text-white rounded-2xl rounded-tr-none"
                    : "bg-white/5 border border-white/10 text-white/80 rounded-2xl rounded-tl-none backdrop-blur-md",
                )}
              >
                <div className="prose prose-invert prose-sm max-w-none">
                  {m.role === "assistant" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-5 mb-2 space-y-1 text-white/60">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-5 mb-2 space-y-1 text-white/60">
                            {children}
                          </ol>
                        ),
                        code: ({ children }) => (
                          <code className="bg-black/40 text-[#ef660f] px-1 py-0.5 rounded text-[13px] font-mono border border-white/10">
                            {children}
                          </code>
                        ),
                        strong: ({ children }) => (
                          <span className="font-bold text-white">
                            {children}
                          </span>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#ef660f] hover:underline"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1.5 px-1">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  {isUser ? "You" : "Agent"} • {formatTime(m.timestamp)}
                </span>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex mr-auto items-start max-w-[75%] animate-pulse">
            <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-2xl rounded-tl-none backdrop-blur-md">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce [animation-delay:-0.3s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Area */}
      <div className="border-t border-white/10 bg-[#11074b]/50 p-4 backdrop-blur-md">
        {/* Active Input */}
        <div className="flex gap-3 items-end mb-3">
          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#ef660f] focus-within:border-[#ef660f] transition-colors">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask a question about cricket..."
              className="w-full bg-transparent border-none text-white placeholder:text-white/40 py-4 px-5 text-[15px] focus:ring-0 resize-none max-h-40 min-h-[56px] focus:outline-none"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className={cn(
              "h-[56px] px-6 rounded-xl font-bold flex items-center justify-center transition-all",
              input.trim() && !isLoading
                ? "bg-[#ef660f] text-white hover:bg-[#ef660f]/80"
                : "bg-white/5 text-white/40 cursor-not-allowed border border-white/10",
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#ef660f]/10 border border-[#ef660f]/20 px-4 py-2.5 rounded-lg inline-flex items-center gap-3 w-full justify-center">
          <AlertCircle className="w-4 h-4 text-[#ef660f] shrink-0" />
          <p className="text-[#ef660f] text-xs font-semibold leading-none">
            Guidance only. AI responses may contain inaccuracies. Please verify
            critical information.
          </p>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
