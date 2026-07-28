"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { products, formatPrice } from "@/lib/data";
import { useRouter } from "next/navigation";

const TRENDING = ["Fitted Caps", "Snapbacks", "Dad Hats", "Limited Edition", "New Arrivals"];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(["Fitted", "Snapback"]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    if (searchOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [searchOpen, setSearchOpen]);

  const results = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearch = (term: string) => {
    setQuery(term);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="relative mx-auto mt-20 w-full max-w-2xl px-4"
          >
            <div className="overflow-hidden rounded-[28px] bg-secondary shadow-xl border border-border">
              <div className="flex items-center border-b border-border px-5">
                <Search className="h-5 w-5 shrink-0 text-muted" strokeWidth={1.8} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-transparent px-4 py-5 text-[16px] text-primary outline-none placeholder:text-muted/40"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="rounded-[14px] p-1.5 text-muted hover:text-primary hover:bg-[#F5F5F5] transition-all"
                >
                  <X className="h-5 w-5" strokeWidth={1.8} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4">
                {query ? (
                  results.length > 0 ? (
                    <div className="space-y-1">
                      {results.map((p) => (
                        <Link
                          key={p.id}
                          href={`/product/${p.id}`}
                          onClick={() => { setSearchOpen(false); setQuery(""); }}
                          className="flex items-center gap-4 rounded-[16px] p-3 transition-colors hover:bg-[#F5F5F5]"
                        >
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[14px] bg-[#F5F5F5]">
                            <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-medium truncate">{p.name}</p>
                            <p className="text-[12px] text-muted">{p.category}</p>
                          </div>
                          <span className="text-[14px] font-semibold whitespace-nowrap">{formatPrice(p.price)}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-[15px] text-muted">No products found for &quot;{query}&quot;</p>
                    </div>
                  )
                ) : (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-4 w-4 text-muted" strokeWidth={1.8} />
                        <span className="text-[12px] font-semibold uppercase tracking-wider text-muted">Trending</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {TRENDING.map((term) => (
                          <button
                            key={term}
                            onClick={() => handleSearch(term)}
                            className="rounded-full border border-border px-4 py-2 text-[13px] text-muted hover:text-primary hover:border-primary transition-all"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="h-4 w-4 text-muted" strokeWidth={1.8} />
                        <span className="text-[12px] font-semibold uppercase tracking-wider text-muted">Recent</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => handleSearch(term)}
                            className="rounded-full border border-border px-4 py-2 text-[13px] text-muted hover:text-primary hover:border-primary transition-all"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[12px] font-semibold uppercase tracking-wider text-muted">Categories</span>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {["Fitted", "Snapback", "Dad Hat", "Limited"].map((cat) => (
                          <Link
                            key={cat}
                            href={`/shop?category=${cat.toLowerCase()}`}
                            onClick={() => setSearchOpen(false)}
                            className="rounded-[16px] border border-border p-4 text-[14px] font-medium hover:border-primary hover:bg-[#F5F5F5] transition-all"
                          >
                            {cat} Caps
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
