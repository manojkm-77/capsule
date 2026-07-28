"use client";

import type { ReactNode } from "react";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  href?: string;
}

const variants = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-white text-primary border border-border hover:bg-secondary",
  ghost: "bg-transparent text-primary hover:bg-secondary",
};

const sizes = {
  sm: "h-[44px] px-5 text-[13px]",
  md: "h-[52px] px-7 text-[14px]",
  lg: "h-[56px] px-10 text-[15px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, className, type = "button", variant = "primary", size = "md", disabled, loading, href }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all",
      "rounded-[14px]",
      variants[variant],
      sizes[size],
      disabled && "opacity-50 cursor-not-allowed",
      loading && "cursor-wait",
      className
    );

    if (href) {
      return (
        <motion.a
          href={href}
          whileHover={!disabled ? { scale: 1.03 } : undefined}
          whileTap={!disabled ? { scale: 0.97 } : undefined}
          className={classes}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        whileHover={!disabled ? { scale: 1.03 } : undefined}
        whileTap={!disabled ? { scale: 0.97 } : undefined}
        className={classes}
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
