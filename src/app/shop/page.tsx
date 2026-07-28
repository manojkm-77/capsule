"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { products } from "@/lib/data";
import { ProductGrid } from "@/components/common/product-grid";
import { Button } from "@/components/ui/button";
import { Pagination as PaginationCmp } from "@/components/ui/pagination";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Fitted", "Snapback", "Dad Hat", "Limited"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Best Selling" },
  { value: "price-asc", label: "Lowest Price" },
  { value: "price-desc", label: "Highest Price" },
  { value: "alpha", label: "Alphabetical" },
];
const PRICE_RANGES = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 - ₹1,500", min: 1000, max: 1500 },
  { label: "₹1,500 - ₹2,000", min: 1500, max: 2000 },
  { label: "Over ₹2,000", min: 2000, max: Infinity },
];

export default function ShopPage() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);
  const perPage = 12;

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== "All") result = result.filter((p) => p.category === category);
    if (searchQuery) {
      result = result.filter(
        (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedPrice) {
      const range = PRICE_RANGES.find((r) => r.label === selectedPrice);
      if (range) result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    }
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "alpha": result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return result;
  }, [category, sort, searchQuery, selectedPrice]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-[12px] font-semibold uppercase tracking-wider text-muted mb-3">Category</h4>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setCurrentPage(1); }}
              className={cn(
                "block w-full rounded-[10px] px-3 py-2 text-left text-[13px] transition-colors",
                category === cat ? "bg-primary text-white font-medium" : "text-muted hover:text-primary hover:bg-secondary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-[12px] font-semibold uppercase tracking-wider text-muted mb-3">Price</h4>
        <div className="space-y-1">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => { setSelectedPrice(selectedPrice === range.label ? null : range.label); setCurrentPage(1); }}
              className={cn(
                "block w-full rounded-[10px] px-3 py-2 text-left text-[13px] transition-colors",
                selectedPrice === range.label ? "bg-primary text-white font-medium" : "text-muted hover:text-primary hover:bg-secondary"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-[12px] font-semibold uppercase tracking-wider text-muted mb-3">Sort By</h4>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-[12px] border border-border bg-white px-3 py-2.5 text-[13px] text-primary outline-none focus:border-primary transition-colors"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="container-caps py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />

      <div className="mt-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Shop</h1>
          <p className="mt-1 text-[13px] text-muted">{filtered.length} products</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={1.8} />
            <input
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search..."
              className="h-[42px] w-[200px] rounded-[12px] border border-border bg-white pl-9 pr-3 text-[13px] text-primary outline-none placeholder:text-muted/40 focus:border-primary transition-colors"
            />
          </div>
          <Button variant="secondary" size="sm" className="lg:hidden" onClick={() => setMobileFilters(true)}>
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.8} /> Filters
          </Button>
        </div>
      </div>

      <div className="mt-8 flex gap-8">
        <aside className="hidden w-[240px] shrink-0 lg:block">
          <div className="sticky top-[100px]">
            <FilterContent />
            {(category !== "All" || selectedPrice || searchQuery) && (
              <button
                onClick={() => { setCategory("All"); setSelectedPrice(null); setSearchQuery(""); }}
                className="mt-4 text-[12px] text-muted hover:text-primary transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {paginated.length > 0 ? (
            <>
              <ProductGrid products={paginated} />
              {totalPages > 1 && (
                <div className="mt-10">
                  <PaginationCmp current={currentPage} total={totalPages} onChange={setCurrentPage} />
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon={<Search className="h-12 w-12" strokeWidth={1.8} />}
              title="No products found"
              description="Try adjusting your filters."
              action={{ label: "Clear Filters", onClick: () => { setCategory("All"); setSelectedPrice(null); setSearchQuery(""); } }}
            />
          )}
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setMobileFilters(false)}
            className="absolute inset-0 bg-black/30"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-[300px] bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[15px] font-semibold">Filters</h3>
              <button onClick={() => setMobileFilters(false)} className="p-1 text-muted hover:text-primary">
                <X className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>
            <FilterContent />
          </motion.div>
        </div>
      )}
    </div>
  );
}
