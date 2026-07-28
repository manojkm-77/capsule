"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, Clock, X } from "lucide-react";
import Link from "next/link";
import { products, formatPrice } from "@/lib/data";
import { useRouter } from "next/navigation";

const TRENDING = ["Fitted Caps", "Snapbacks", "Dad Hats", "Limited Edition", "New Arrivals"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(["Fitted", "Snapback"]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="container-caps py-8">
      <div className="relative mx-auto max-w-2xl">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" strokeWidth={1.8} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="h-[56px] w-full rounded-[20px] border border-border bg-secondary pl-12 pr-4 text-[16px] text-primary outline-none placeholder:text-muted/40 focus:border-primary transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        )}
      </div>

      <div className="mx-auto mt-8 max-w-2xl">
        {query ? (
          results.length > 0 ? (
            <div className="space-y-1">
              <p className="mb-4 text-[13px] text-muted">{results.length} results for &quot;{query}&quot;</p>
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
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
            <div className="py-16 text-center">
              <p className="text-[15px] text-muted">No products found for &quot;{query}&quot;</p>
              <p className="mt-1 text-[13px] text-muted/60">Try a different search term</p>
            </div>
          )
        ) : (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-muted" strokeWidth={1.8} />
                <span className="text-[12px] font-semibold uppercase tracking-wider text-muted">Trending</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="rounded-full border border-border px-4 py-2 text-[13px] text-muted hover:text-primary hover:border-primary transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-muted" strokeWidth={1.8} />
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-muted">Recent</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="rounded-full border border-border px-4 py-2 text-[13px] text-muted hover:text-primary hover:border-primary transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-wider text-muted">Categories</span>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {["Fitted", "Snapback", "Dad Hat", "Limited"].map((cat) => (
                  <Link
                    key={cat}
                    href={`/shop?category=${cat.toLowerCase()}`}
                    className="rounded-[16px] border border-border p-4 text-[14px] font-medium hover:border-primary hover:bg-[#F5F5F5] transition-all text-center"
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
  );
}
