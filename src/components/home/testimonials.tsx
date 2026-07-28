"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container-caps">
        <SectionTitle
          label="Testimonials"
          title="What Our Customers Say"
          description="Real reviews from real people who wear our caps."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-[20px] border border-border bg-secondary p-6"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-4 w-4 ${j < t.rating ? "text-primary fill-primary" : "text-border"}`}
                    strokeWidth={1.8}
                  />
                ))}
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-muted">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-[14px] font-medium">{t.name}</p>
                <p className="text-[12px] text-muted">{t.handle} &middot; {t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
