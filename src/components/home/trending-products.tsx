"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { ProductGrid } from "@/components/common/product-grid";
import { products } from "@/lib/data";

export function TrendingProducts() {
  const trending = [...products].sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container-caps">
        <SectionTitle
          title="Trending Now"
          action={
            <Link href="/shop" className="text-[13px] font-medium text-muted hover:text-primary transition-colors">
              View All <ArrowRight className="inline h-3 w-3 ml-0.5" strokeWidth={1.8} />
            </Link>
          }
        />
        <div className="mt-8">
          <ProductGrid products={trending} />
        </div>
      </div>
    </section>
  );
}
