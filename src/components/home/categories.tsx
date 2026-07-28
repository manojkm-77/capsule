"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";

const categories = [
  { title: "Caps", count: "24 Products", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=400&auto=format&fit=crop", href: "/shop?category=cap" },
  { title: "Snapback", count: "18 Products", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=400&auto=format&fit=crop", href: "/shop?category=snapback" },
  { title: "Baseball", count: "12 Products", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop", href: "/shop?category=baseball" },
  { title: "Dad Cap", count: "8 Products", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400&auto=format&fit=crop", href: "/shop?category=dad-hat" },
  { title: "Beanies", count: "6 Products", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=400&auto=format&fit=crop", href: "/shop?category=beanie" },
  { title: "Limited Edition", count: "4 Products", image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=400&auto=format&fit=crop", href: "/collections/limited" },
];

export function Categories() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container-caps">
        <SectionTitle
          label="Categories"
          title="Shop by Category"
          description="Find your perfect style from our curated collections."
        />
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="min-w-[160px] snap-start lg:min-w-0"
            >
              <Link href={cat.href} className="group block">
                <div className="relative overflow-hidden rounded-[20px] bg-secondary aspect-[3/4]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-[14px] font-semibold text-white">{cat.title}</h3>
                    <p className="mt-0.5 text-[11px] text-white/60">{cat.count}</p>
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
