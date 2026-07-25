"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

let toastListeners: ((msg: string) => void)[] = [];

export function toast(message: string) {
  toastListeners.forEach((fn) => fn(message));
}

export function Toaster() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const handler = (msg: string) => {
      setMessages((prev) => [...prev, msg]);
      setTimeout(() => {
        setMessages((prev) => prev.slice(1));
      }, 2500);
    };
    toastListeners.push(handler);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== handler);
    };
  }, []);

  if (typeof window !== "object") return null;

  return createPortal(
    <div className="pointer-events-none fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 space-y-2">
      <AnimatePresence>
        {messages.map((msg, i) => (
          <motion.div
            key={`${msg}-${i}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-card px-5 py-3 text-sm font-medium text-stitch shadow-2xl backdrop-blur-xl"
          >
            <Check className="h-4 w-4 text-lime" />
            {msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}
