"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { ProductGrid } from "@/components/common/product-grid";
import { products } from "@/lib/data";

export function BestSellers() {
  const best = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container-caps">
        <SectionTitle
          label="Best Sellers"
          title="Customer Favorites"
          description="The most loved styles in our collection."
          action={
            <Link href="/shop?sort=popular" className="text-[13px] font-medium text-muted hover:text-primary transition-colors">
              View All <ArrowRight className="inline h-3 w-3 ml-0.5" strokeWidth={1.8} />
            </Link>
          }
        />
        <div className="mt-8">
          <ProductGrid products={best} />
        </div>
      </div>
    </section>
  );
}
