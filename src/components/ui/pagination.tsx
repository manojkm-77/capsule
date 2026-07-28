"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export function Pagination({ current, total, onChange }: PaginationProps) {
  const pages = Array.from({ length: Math.min(total, 5) }, (_, i) => {
    if (total <= 5) return i + 1;
    if (current <= 3) return i + 1;
    if (current >= total - 2) return total - 4 + i;
    return current - 2 + i;
  });

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-border text-muted hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages[0] > 1 && (
        <>
          <button onClick={() => onChange(1)} className="flex h-10 w-10 items-center justify-center rounded-[14px] text-[14px] text-muted hover:text-primary transition-colors">1</button>
          {pages[0] > 2 && <span className="text-muted px-1">...</span>}
        </>
      )}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-[14px] text-[14px] font-medium transition-all",
            page === current
              ? "bg-primary text-secondary"
              : "text-muted hover:text-primary"
          )}
        >
          {page}
        </button>
      ))}
      {pages[pages.length - 1] < total && (
        <>
          {pages[pages.length - 1] < total - 1 && <span className="text-muted px-1">...</span>}
          <button onClick={() => onChange(total)} className="flex h-10 w-10 items-center justify-center rounded-[14px] text-[14px] text-muted hover:text-primary transition-colors">{total}</button>
        </>
      )}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-border text-muted hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
