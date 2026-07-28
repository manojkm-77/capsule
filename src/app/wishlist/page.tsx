"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import { products } from "@/lib/data";
import { ProductGrid } from "@/components/common/product-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-caps py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <h1 className="mt-6 text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight">My Wishlist</h1>
      <p className="mt-2 text-[14px] text-muted">{wishlist.length} items saved</p>

      <div className="mt-8">
        {wishlistProducts.length > 0 ? (
          <ProductGrid products={wishlistProducts} />
        ) : (
          <EmptyState
            icon={<Heart className="h-16 w-16" strokeWidth={1.8} />}
            title="Your wishlist is empty"
            description="Save your favorite items and come back to them later."
            action={{ label: "Browse Products", href: "/shop" }}
          />
        )}
      </div>
    </div>
  );
}
