"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { toast } from "@/components/ui/toaster";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    if (!isWishlisted) {
      toast("Added to wishlist");
    }
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index || 0) * 0.05 }}
    >
      <Link href={`/product/${product.id}`} className="group block">
        <div
          className="relative overflow-hidden rounded-[22px] bg-[#F5F5F5]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="aspect-[3/4] w-full">
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover"
              animate={{ opacity: isHovered && product.images[1] ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            {product.images[1] && (
              <motion.img
                src={product.images[1]}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-sale px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary">
              -{discount}%
            </span>
          )}

          <button
            onClick={handleWishlist}
            className={cn(
              "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-secondary/80 backdrop-blur-sm transition-all",
              isWishlisted ? "text-sale" : "text-muted hover:text-primary"
            )}
            aria-label="Add to wishlist"
          >
            <Heart
              className="h-4 w-4"
              strokeWidth={1.8}
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 left-3 right-3"
          >
            <button className="w-full rounded-[14px] bg-primary py-3 text-[12px] font-medium text-secondary hover:bg-primary/90 transition-colors">
              Quick Add
            </button>
          </motion.div>
        </div>

        <div className="mt-3 space-y-1">
          {product.brand && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              {product.brand}
            </p>
          )}
          <h3 className="text-[14px] font-medium">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[12px] text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-1.5 pt-1">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="h-3 w-3 rounded-full border border-border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
