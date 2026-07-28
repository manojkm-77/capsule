"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { ProductGrid } from "@/components/common/product-grid";
import { products } from "@/lib/data";

export function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container-caps">
        <SectionTitle
          label="Featured"
          title="Best Sellers"
          description="Our most popular styles, loved by customers across the country."
          action={
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-muted hover:text-primary transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          }
        />
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
