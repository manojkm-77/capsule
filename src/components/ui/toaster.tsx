"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

interface ToastMessage {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
}

let toastListeners: ((msg: string, type?: "success" | "error" | "info") => void)[] = [];

export function toast(message: string, type?: "success" | "error" | "info") {
  toastListeners.forEach((fn) => fn(message, type));
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  useEffect(() => {
    toastListeners.push(addToast);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== addToast);
    };
  }, [addToast]);

  if (typeof window !== "object") return null;

  return createPortal(
    <div className="pointer-events-none fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 space-y-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="pointer-events-auto flex items-center gap-3 rounded-[16px] bg-primary px-5 py-3 text-sm font-medium text-secondary shadow-lg"
          >
            {t.type === "success" && <Check className="h-4 w-4 text-success" strokeWidth={1.8} />}
            {t.type === "error" && <X className="h-4 w-4 text-sale" strokeWidth={1.8} />}
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}
