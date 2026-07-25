"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Share2, Check, Scissors, Shield, Truck } from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { toast } from "@/components/ui/toaster";
import { use } from "react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addToCart, cart } = useStore();

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="font-display text-4xl">Cap not found</h1>
        <Link href="/shop" className="mt-6 inline-flex items-center gap-2 text-lime">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>
      </div>
    );
  }

  const inCart = cart.find((i) => i.id === product.id)?.quantity || 0;

  const handleAdd = () => {
    addToCart({ ...product, size: "One Size", quantity: 1, image: product.color });
    toast("Added to cart");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wider text-white/40 transition-colors hover:text-lime"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div
            className="aspect-[4/5] w-full rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${product.color}, ${product.color}dd, #0B0B0B)`,
            }}
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-lime px-4 py-2 text-[0.6rem] font-bold uppercase tracking-wider text-dark">
              {product.badge}
            </span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-lime">
            {product.category}
          </span>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] leading-[0.9] tracking-tight">
            {product.name}
          </h1>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl text-lime">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="font-mono text-sm text-white/30 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm text-white/60">
              <Check className="h-4 w-4 text-lime" />
              Premium structured fit
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <Check className="h-4 w-4 text-lime" />
              100% embroidered logo
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <Check className="h-4 w-4 text-lime" />
              Adjustable snapback closure
            </div>
          </div>

          <div className="mt-8 border-t border-white/5 pt-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
                Size: One Size (Adjustable)
              </p>
            </div>

            <p className="mb-6 text-xs leading-relaxed text-white/30">
              Orders placed before 2 PM ship same day. You'll receive tracking on WhatsApp.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAdd}
                className="flex items-center justify-center gap-2 rounded-full bg-lime px-10 py-4 text-[0.75rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/80"
              >
                <ShoppingBag className="h-4 w-4" />
                {inCart > 0 ? `Add Another (${inCart})` : "Add to Cart"}
              </button>
              <button className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-[0.7rem] font-semibold uppercase tracking-wider text-white/50 transition-colors hover:border-lime/30 hover:text-lime">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 rounded-3xl border border-white/5 bg-card/30 p-5">
              <div className="text-center">
                <Scissors className="mx-auto mb-2 h-5 w-5 text-lime/60" />
                <p className="text-[0.6rem] font-semibold uppercase text-white/40">Stitched</p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto mb-2 h-5 w-5 text-lime/60" />
                <p className="text-[0.6rem] font-semibold uppercase text-white/40">Premium</p>
              </div>
              <div className="text-center">
                <Truck className="mx-auto mb-2 h-5 w-5 text-lime/60" />
                <p className="text-[0.6rem] font-semibold uppercase text-white/40">Fast Ship</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
