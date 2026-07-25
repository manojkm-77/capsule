"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const TICKER = [
  "NO PAYMENT LINKS",
  "ORDER THROUGH WHATSAPP",
  "PAN INDIA SHIPPING",
  "LIMITED DROP",
  "STITCHED NOT PRINTED",
  "DM TO COP",
];

export function AnnouncementBar() {
  return (
    <div className="relative z-50 overflow-hidden bg-lime py-2.5">
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
                className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-dark"
              >
                {text}
                <span className="ml-8 inline-block opacity-50">◆</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
