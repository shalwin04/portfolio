"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatAgent from "./ChatAgent";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating chat button - minimal style */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border border-cream/20 hover:border-cream/40 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{
          background: "rgba(10, 10, 15, 0.8)",
          backdropFilter: "blur(10px)",
        }}
        aria-label="Open chat"
      >
        <svg
          className="w-6 h-6 text-cream"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && <ChatAgent onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
