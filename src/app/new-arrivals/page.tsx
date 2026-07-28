"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { ProductGrid } from "@/components/common/product-grid";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { products } from "@/lib/data";

export default function NewArrivalsPage() {
  const newProducts = products.filter((p) => p.badge === "New").length > 0
    ? products.filter((p) => p.badge === "New")
    : products.slice(0, 4);

  return (
    <div className="container-caps py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "New Arrivals" }]} />
      <SectionTitle
        label="New Arrivals"
        title="Fresh Drops"
        description="Be the first to wear our latest designs."
      />
      <div className="mt-8">
        <ProductGrid products={newProducts} />
      </div>
    </div>
  );
}
