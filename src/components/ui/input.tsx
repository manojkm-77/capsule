"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-[13px] font-medium text-primary/70">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "h-[52px] w-full rounded-[16px] border border-border bg-secondary px-4 text-[15px] text-primary outline-none transition-all",
            "placeholder:text-muted/50",
            "focus:border-primary focus:ring-0",
            error && "border-sale",
            className
          )}
          {...props}
        />
        {error && <p className="text-[12px] text-sale">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
