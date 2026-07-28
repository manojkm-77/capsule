"use client";

import { motion } from "framer-motion";

const brands = [
  { name: "CAPSULE", width: "w-28" },
  { name: "URBAN", width: "w-24" },
  { name: "STITCH", width: "w-20" },
  { name: "NOMAD", width: "w-24" },
  { name: "FORGE", width: "w-20" },
  { name: "MILAN", width: "w-24" },
];

export function Brands() {
  return (
    <section className="py-12 lg:py-16 bg-secondary border-y border-border">
      <div className="container-caps">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-muted mb-8">
          Featured Brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {brands.map((brand, i) => (
            <motion.span
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`text-lg font-bold tracking-tight text-border hover:text-primary/30 transition-colors cursor-default ${brand.width}`}
            >
              {brand.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
