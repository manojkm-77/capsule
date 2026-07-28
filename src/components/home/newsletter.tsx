"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-caps">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">
            Newsletter
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold leading-[1.15] tracking-tight">
            Stay in the know
          </h2>
          <p className="mt-3 text-[15px] text-muted">
            Be the first to know about new drops, exclusive offers, and early access.
          </p>
          <div className="mt-8 flex gap-3">
            <div className="flex-1">
              <Input placeholder="Enter your email" type="email" />
            </div>
            <Button>
              Subscribe
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </Button>
          </div>
          <p className="mt-4 text-[12px] text-muted/60">
            No spam, unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
