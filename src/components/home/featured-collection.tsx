"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedCollection() {
  return (
    <section className="py-12 lg:py-16 bg-secondary">
      <div className="container-caps">
        <div className="grid overflow-hidden rounded-[22px] bg-white border border-border lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="aspect-[4/3] lg:aspect-auto overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=800&auto=format&fit=crop"
              alt="Featured collection"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center p-8 lg:p-12"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              Featured Collection
            </span>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.15] tracking-tight">
              The Monochrome Series
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-muted max-w-md">
              Clean lines. Timeless silhouettes. Our latest collection explores monochrome minimalism with premium fabrics and precise construction.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/shop?collection=monochrome"
                className="inline-flex h-[48px] items-center gap-2 rounded-[14px] bg-primary px-6 text-[13px] font-medium text-white transition-all hover:bg-primary/90"
              >
                Explore Collection <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
