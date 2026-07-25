"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/data";

export function FAQ() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="faq" className="relative overflow-hidden border-t border-white/5 py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-lime">
            FAQ
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,4rem)] leading-[0.9] tracking-tight">
            Got
            <br />
            <span className="text-lime">Questions?</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/5 bg-card/30 transition-all hover:border-white/10"
            >
              <button
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-sm font-semibold">{faq.question}</span>
                <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40">
                  {open === faq.id ? (
                    <Minus className="h-3.5 w-3.5" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {open === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-white/40">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
