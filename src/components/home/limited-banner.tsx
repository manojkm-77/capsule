"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LimitedBanner() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container-caps">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[22px] bg-primary"
        >
          <div className="relative z-10 flex flex-col items-center justify-center px-8 py-16 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
              Limited Edition
            </span>
            <h2 className="mt-3 text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-white leading-[1.15] tracking-tight">
              The Midnight Collection
            </h2>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/60">
              An exclusive drop of premium caps in deep, rich tones. Only 50 pieces available worldwide. Once they&apos;re gone, they&apos;re gone.
            </p>
            <Link
              href="/collections/limited"
              className="mt-6 inline-flex h-[48px] items-center gap-2 rounded-[14px] bg-white px-6 text-[13px] font-medium text-primary transition-all hover:bg-white/90"
            >
              Shop Limited Edition <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
