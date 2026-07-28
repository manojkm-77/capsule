"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { ProductGrid } from "@/components/common/product-grid";
import { products } from "@/lib/data";

export function NewArrivalsSection() {
  const newArrivals = products.filter((p) => p.badge === "New").length > 0
    ? products.filter((p) => p.badge === "New")
    : products.slice(0, 4);

  return (
    <section className="py-12 lg:py-16 bg-secondary">
      <div className="container-caps">
        <SectionTitle
          label="New Arrivals"
          title="Fresh Drops"
          description="Be the first to wear our latest designs."
          action={
            <Link href="/new-arrivals" className="text-[13px] font-medium text-muted hover:text-primary transition-colors">
              View All <ArrowRight className="inline h-3 w-3 ml-0.5" strokeWidth={1.8} />
            </Link>
          }
        />
        <div className="mt-8">
          <ProductGrid products={newArrivals} />
        </div>
      </div>
    </section>
  );
}
