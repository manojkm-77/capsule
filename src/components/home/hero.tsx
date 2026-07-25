"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[80vh] sm:min-h-[88vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark" />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(215,255,31,0.06),transparent_70%)]"
        style={{ y }}
      />
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime/20 bg-lime/5 px-4 py-1.5">
            <Zap className="h-3 w-3 text-lime" />
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-lime">
              Drop 4 — Coming August 1
            </span>
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-[clamp(2.5rem,12vw,9rem)] leading-[0.85] tracking-tight"
        >
          Premium
          <br />
          <span className="text-lime">Caps</span>
          {" "}for the
          <br />
          Culture
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto mt-6 max-w-xl text-base text-white/40 leading-relaxed"
        >
          Stitched not printed. No cart, no checkout — DM to cop.
          Based in Bengaluru, shipping pan-India.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-8 sm:mt-10 flex flex-col items-center gap-3 sm:gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 sm:px-8 py-3.5 sm:py-4 text-[0.7rem] sm:text-[0.75rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/80"
          >
            Shop Collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/#drops"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 sm:px-8 py-3.5 sm:py-4 text-[0.7rem] sm:text-[0.75rem] font-bold uppercase tracking-wider text-stitch transition-all hover:border-lime/50"
          >
            View Drops
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
