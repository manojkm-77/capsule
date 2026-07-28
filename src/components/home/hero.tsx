"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] bg-background overflow-hidden">
      <div className="container-caps flex min-h-[85vh] items-center">
        <div className="grid w-full gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center py-12"
          >
            <span className="mb-4 inline-block rounded-full border border-border bg-secondary px-4 py-1.5 text-[11px] font-medium text-muted">
              Premium Headwear Collection
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,3.5rem)] font-bold leading-[1.1] tracking-tight">
              Discover
              <br />
              Premium Caps
              <br />
              <span className="text-muted">Designed for Every Journey</span>
            </h1>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-muted">
              Thoughtfully crafted headwear that combines premium materials with timeless design. 
              From the city streets to the open road, find your perfect fit.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/shop">
                Shop Collection
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Button>
              <Button variant="ghost" size="lg">
                <Play className="h-4 w-4" strokeWidth={1.8} />
                Explore
              </Button>
            </div>
            <div className="mt-12 flex items-center gap-8 border-t border-border pt-8">
              {[
                { value: "5K+", label: "Happy Customers" },
                { value: "25+", label: "Cities" },
                { value: "4.9", label: "Avg. Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-[12px] text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center py-12"
          >
            <div className="relative w-full max-w-lg">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-[30px] bg-[#F0F0F0]">
                <motion.img
                  src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop"
                  alt="Premium Cap"
                  className="h-full w-full object-cover"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-[20px] bg-secondary border border-border p-4 shadow-sm">
                <p className="text-[13px] font-medium">Free Shipping</p>
                <p className="text-[11px] text-muted">On orders over ₹999</p>
              </div>
              <div className="absolute -right-4 -top-4 rounded-[20px] bg-primary px-4 py-3 text-secondary shadow-sm">
                <p className="text-[13px] font-medium">New Drop</p>
                <p className="text-[11px] text-primary/70">Limited Edition</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
