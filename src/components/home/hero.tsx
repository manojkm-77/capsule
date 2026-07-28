"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative max-h-[40vh] min-h-[360px] bg-background overflow-hidden border-b border-border">
      <div className="container-caps h-full">
        <div className="flex h-full min-h-[360px] items-center">
          <div className="grid w-full gap-8 lg:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center py-8 lg:col-span-2"
            >
              <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                New Collection
              </span>
              <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.15] tracking-tight">
                Premium Caps
                <br />
                <span className="text-muted font-normal">Built For Everyday Style</span>
              </h1>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-muted">
                Thoughtfully crafted headwear designed for comfort, durability, and timeless style.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex h-[48px] items-center gap-2 rounded-[14px] bg-primary px-6 text-[13px] font-medium text-white transition-all hover:bg-primary/90"
                >
                  Shop Collection
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                </Link>
                <Link
                  href="/new-arrivals"
                  className="inline-flex h-[48px] items-center gap-2 rounded-[14px] border border-border px-6 text-[13px] font-medium text-muted transition-all hover:text-primary hover:border-primary"
                >
                  View New Arrivals
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center lg:col-span-3"
            >
              <div className="w-full max-h-[320px] overflow-hidden rounded-[22px] bg-secondary">
                <img
                  src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop"
                  alt="Premium caps collection"
                  className="w-full h-full object-cover"
                  style={{ maxHeight: "320px" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
