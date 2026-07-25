"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({ children, onClick, className = "", type = "button" }: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-[0.7rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/80 ${className}`}
    >
      {children}
    </motion.button>
  );
}
