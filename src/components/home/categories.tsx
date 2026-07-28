"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";

const categories = [
  {
    title: "Fitted Caps",
    count: "12 Products",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop",
    href: "/collections/fitted",
  },
  {
    title: "Snapbacks",
    count: "8 Products",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop",
    href: "/collections/snapback",
  },
  {
    title: "Dad Hats",
    count: "6 Products",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop",
    href: "/collections/dad-hat",
  },
  {
    title: "Limited Edition",
    count: "4 Products",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop",
    href: "/collections/limited",
  },
];

export function Categories() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-caps">
        <SectionTitle
          label="Categories"
          title="Shop by Category"
          description="Find your perfect style from our curated collections."
          action={
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-muted hover:text-primary transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link href={cat.href} className="group block">
                <div className="relative overflow-hidden rounded-[22px] bg-[#F5F5F5]">
                  <div className="aspect-[4/5] w-full">
                    <motion.img
                      src={cat.image}
                      alt={cat.title}
                      className="h-full w-full object-cover transition-transform duration-500"
                      whileHover={{ scale: 1.08 }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-semibold text-secondary">{cat.title}</h3>
                    <p className="mt-0.5 text-[13px] text-secondary/60">{cat.count}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
