"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";

const collections = [
  {
    title: "Fitted Caps",
    description: "Structured fits that never lose their shape. Premium craftsmanship for the perfect silhouette.",
    count: "12 Products",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop",
    href: "/collections/fitted",
  },
  {
    title: "Snapbacks",
    description: "Classic silhouettes with modern detailing. Adjustable comfort meets street-ready style.",
    count: "8 Products",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop",
    href: "/collections/snapback",
  },
  {
    title: "Dad Hats",
    description: "Relaxed, unstructured, and effortlessly cool. Your everyday essential with a premium finish.",
    count: "6 Products",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    href: "/collections/dad-hat",
  },
  {
    title: "Limited Edition",
    description: "Exclusive drops that disappear fast. Unique designs, limited quantities, zero restocks.",
    count: "4 Products",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    href: "/collections/limited",
  },
];

export default function CollectionsPage() {
  return (
    <div className="container-caps py-12">
      <SectionTitle
        label="Collections"
        title="Our Collections"
        description="Explore our range of premium headwear, from classic fitted caps to limited edition drops."
      />

      <div className="mt-8 space-y-8">
        {collections.map((col, i) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link href={col.href} className="group block">
              <div className="grid overflow-hidden rounded-[30px] bg-[#F5F5F5] lg:grid-cols-2">
                <div className={`relative aspect-[4/3] overflow-hidden lg:aspect-auto ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <img
                    src={col.image}
                    alt={col.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {col.count}
                  </span>
                  <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight">
                    {col.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {col.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-primary group-hover:gap-3 transition-all">
                    Explore Collection <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
