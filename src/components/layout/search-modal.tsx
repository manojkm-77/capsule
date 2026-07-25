"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { products, formatPrice } from "@/lib/data";

export function SearchModal() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");

  const results = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed left-1/2 top-24 z-50 w-full max-w-xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl">
              <div className="flex items-center border-b border-white/5 px-5">
                <Search className="h-4 w-4 shrink-0 text-white/30" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-transparent px-4 py-5 text-sm text-stitch outline-none placeholder:text-white/25"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="rounded-full p-1 text-white/30 hover:text-stitch"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto p-3">
                {query && results.length === 0 && (
                  <p className="py-8 text-center text-sm text-white/30">
                    No products found
                  </p>
                )}
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-white/5"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-14 w-14 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-white/40">{p.category}</p>
                    </div>
                    <span className="font-mono text-sm text-lime">
                      {formatPrice(p.price)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
