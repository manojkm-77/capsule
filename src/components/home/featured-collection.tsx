"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function FeaturedCollection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="collections" ref={ref} className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime/20 bg-lime/5 px-4 py-1.5">
              <Sparkles className="h-3 w-3 text-lime" />
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-lime">
                Collection
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight">
              Featured
              <br />
              <span className="text-lime">Caps</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50 transition-colors hover:text-lime sm:flex"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ y }}
            >
              <Link href={`/product/${product.id}`} className="group block">
                <div className="relative mb-4 overflow-hidden rounded-3xl bg-card">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-lime px-3 py-1 text-[0.55rem] font-bold uppercase tracking-wider text-dark">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">{product.name}</h3>
                    <p className="mt-0.5 text-xs text-white/40">{product.category}</p>
                  </div>
                  <span className="font-mono text-xs text-lime">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
