"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { products } from "@/lib/data";
import { ProductGrid } from "@/components/common/product-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination as PaginationCmp } from "@/components/ui/pagination";
import { SectionTitle } from "@/components/ui/section-title";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Fitted", "Snapback", "Dad Hat", "Limited"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "alpha", label: "Alphabetical" },
];

export default function ShopPage() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "alpha":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return result;
  }, [category, sort, searchQuery]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="container-caps py-8 lg:py-12">
      <SectionTitle
        label="Shop"
        title="All Products"
        description="Browse our complete collection of premium caps."
      />

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={1.8} />
          <input
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search products..."
            className="h-[52px] w-full rounded-[16px] border border-border bg-secondary pl-11 pr-4 text-[14px] text-primary outline-none placeholder:text-muted/50 focus:border-primary transition-colors"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-[52px] rounded-[16px] border border-border bg-secondary px-4 text-[14px] text-primary outline-none focus:border-primary transition-colors"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <Button
            variant="secondary"
            size="md"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.8} />
            Filters
          </Button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: filtersOpen ? "auto" : 0, opacity: filtersOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="mb-8 rounded-[20px] border border-border bg-secondary p-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-muted">Category</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setCurrentPage(1); }}
                  className={cn(
                    "rounded-full px-5 py-2 text-[13px] font-medium transition-all",
                    category === cat
                      ? "bg-primary text-secondary"
                      : "border border-border text-muted hover:border-primary hover:text-primary"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {paginated.length > 0 ? (
        <>
          <ProductGrid products={paginated} />
          {totalPages > 1 && (
            <div className="mt-12">
              <PaginationCmp
                current={currentPage}
                total={totalPages}
                onChange={setCurrentPage}
              />
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={<Search className="h-12 w-12" strokeWidth={1.8} />}
          title="No products found"
          description="Try adjusting your filters or search query."
          action={{ label: "Clear Filters", onClick: () => { setCategory("All"); setSearchQuery(""); } }}
        />
      )}
    </div>
  );
}
