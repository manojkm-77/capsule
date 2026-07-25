"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

function getAllCategories() {
  return [...new Set(products.map((p) => p.category))];
}

const CATEGORIES = ["All", ...getAllCategories()];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceSort, setPriceSort] = useState<"none" | "low" | "high">("none");
  const [filtersOpen, setFiltersOpen] = useState(false);

  let filtered = products.filter((p) => {
    const catMatch = selectedCategory === "All" || p.category === selectedCategory;
    const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  if (priceSort === "low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (priceSort === "high") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-lime">
          Shop
        </span>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight">
          Collection
        </h1>
      </motion.div>

      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search caps..."
            className="w-full rounded-full border border-white/10 bg-card py-3 pl-12 pr-4 text-sm text-stitch outline-none placeholder:text-white/25 focus:border-lime/30"
          />
        </div>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-wider text-white/60 transition-colors hover:border-lime/30 hover:text-lime"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </button>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-white/5 bg-card/50 p-5">
              <span className="text-xs font-semibold text-white/40">Category:</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-wider transition-all ${
                      selectedCategory === cat
                        ? "bg-lime text-dark"
                        : "border border-white/10 text-white/50 hover:border-white/20"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-white/40">Price:</span>
                {(["none", "low", "high"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setPriceSort(opt)}
                    className={`rounded-full px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-wider ${
                      priceSort === opt
                        ? "bg-lime text-dark"
                        : "border border-white/10 text-white/40"
                    }`}
                  >
                    {opt === "none" ? "All" : opt === "low" ? "Low-High" : "High-Low"}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/product/${product.id}`} className="group block">
              <div className="relative mb-4 overflow-hidden rounded-3xl bg-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-lime px-3 py-1 text-[0.55rem] font-bold uppercase tracking-wider text-dark">
                    {product.badge}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{product.name}</h3>
                  <p className="mt-0.5 text-xs text-white/40">{product.category}</p>
                </div>
                <span className="font-mono text-xs text-lime">
                  {formatPrice(product.price)}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-sm text-white/30">No caps found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
