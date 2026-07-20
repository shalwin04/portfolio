"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatAgentProps {
  onClose: () => void;
}

const suggestedQuestions = [
  "Tell me about your projects",
  "What technologies do you use?",
  "How can I contact you?",
  "What's your experience?",
];

export default function ChatAgent({ onClose }: ChatAgentProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello. I'm Shalwin's AI assistant. Ask me anything about his work, projects, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologize, but I'm having trouble connecting right now. Please try again or use the contact links below.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] rounded-lg flex flex-col overflow-hidden border border-cream/20"
      style={{
        background: "rgba(10, 10, 15, 0.95)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-cream/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center">
            <span className="text-cream/60 text-sm font-mono">AI</span>
          </div>
          <div>
            <h3 className="text-cream text-sm font-medium tracking-wide">ASSISTANT</h3>
            <p className="text-xs text-cream/40 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Online
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-cream/40 hover:text-cream transition-colors"
          aria-label="Close chat"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-lg ${
                message.role === "user"
                  ? "bg-cream/10 text-cream border border-cream/20"
                  : "bg-transparent text-cream/80 border-l-2 border-cream/20 pl-4"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </motion.div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="border-l-2 border-cream/20 pl-4 py-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-cream/40 rounded-full animate-pulse" />
                <span className="w-1.5 h-1.5 bg-cream/40 rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-cream/40 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-cream/30 font-mono mb-2 uppercase tracking-wider">Suggestions</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => sendMessage(question)}
                className="text-xs px-3 py-1.5 rounded border border-cream/20 text-cream/60 hover:text-cream hover:border-cream/40 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-cream/10"
      >
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 rounded-lg bg-transparent text-cream placeholder-cream/30 border border-cream/20 focus:border-cream/40 focus:outline-none transition-colors text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 rounded-lg border border-cream/20 text-cream/60 hover:text-cream hover:border-cream/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
