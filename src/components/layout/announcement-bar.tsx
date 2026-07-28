"use client";

import { motion } from "framer-motion";

const TICKER = [
  "Free Shipping on orders over ₹999",
  "New Drop — Limited Edition",
  "Premium Quality, Stitched in India",
  "Easy Returns Within 7 Days",
  "Pay via UPI, Card, or COD",
];

export function AnnouncementBar() {
  return (
    <div className="relative z-50 overflow-hidden bg-primary py-2.5">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center gap-8 px-4">
            {TICKER.map((text, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium tracking-wide text-secondary/80"
              >
                {text}
                <span className="ml-8 inline-block opacity-40">✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
