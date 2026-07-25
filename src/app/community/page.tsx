"use client";

import { motion } from "framer-motion";
import { Camera, Image, MessageCircle, MapPin } from "lucide-react";
import Link from "next/link";

const GALLERY = [
  { label: "Street Style Bengaluru", user: "@captown" },
  { label: "Night Market Fit", user: "@night.caps" },
  { label: "Rooftop Session", user: "@rooftop.fit" },
  { label: "Mumbai Local Flex", user: "@mumbai.street" },
  { label: "Goa Beach Rotation", user: "@goa.vibes" },
  { label: "Pune Indie Vibe", user: "@pune.stories" },
  { label: "Delhi Cuff Parade", user: "@delhi.street" },
  { label: "Chennai Sunset", user: "@chennai.rotates" },
];

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 sm:mb-16 max-w-3xl"
      >
        <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-lime">
          Community
        </span>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.85] tracking-tight">
          Built by
          <br />
          <span className="text-lime">the Culture.</span>
          <br />
          For the Culture.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/40">
          CAPSULE is more than a cap brand. It's a community of people who value quality,
          craftsmanship, and the simple act of wearing something well-made.
        </p>
      </motion.div>

      <div className="mb-12 sm:mb-20 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        {GALLERY.map((item, i) => (
          <motion.div
            key={item.user}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl bg-card"
          >
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, #0B0B0B, #1a1a1a${(i % 3) + 5}, #0D0D0D)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="text-sm font-medium">{item.label}</p>
              <p className="mt-1 text-xs text-white/40">{item.user}</p>
            </div>
            <div className="absolute right-3 top-3 rounded-full bg-lime/20 p-2 backdrop-blur-sm">
              <Image className="h-4 w-4 text-lime" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/5 bg-card/50 p-6 sm:p-10"
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-lime/20 bg-lime/5">
            <MapPin className="h-5 w-5 text-lime" />
          </div>
          <h2 className="font-display text-xl sm:text-2xl tracking-tight">
            India's <span className="text-lime">Capsule</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/40">
            From Bengaluru to Goa, Delhi to Chennai — we've shipped to 25+ cities.
            Every cap carries a story. Where will yours go?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/5 bg-card/50 p-6 sm:p-10"
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-lime/20 bg-lime/5">
            <MessageCircle className="h-5 w-5 text-lime" />
          </div>
          <h2 className="font-display text-xl sm:text-2xl tracking-tight">
            Join the <span className="text-lime">Movement</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/40">
            Follow us on Instagram, share your fit with #CapsuleCaps, and be part of the
            next drop. DM us — we actually reply.
          </p>
          <Link
            href={waLink("Hey CAPSULE! I want to be part of the community!")}
            target="_blank"
            rel="noopener"
            className="mt-4 sm:mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-5 sm:px-6 py-2.5 sm:py-3 text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/80"
          >
            <MessageCircle className="h-4 w-4" /> Join on WhatsApp
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function waLink(text: string) {
  return `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
}
