import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "sale" | "success" | "new";
  className?: string;
}

const variants = {
  default: "bg-primary text-secondary",
  sale: "bg-sale text-secondary",
  success: "bg-success text-secondary",
  new: "bg-primary text-secondary",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
