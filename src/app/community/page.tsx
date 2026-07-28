"use client";

import { motion } from "framer-motion";
import { Camera, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

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
    <div className="container-caps py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Community" }]} />

      <div className="mt-8 max-w-3xl">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Community</span>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight">
          Join the
          <br />
          <span className="text-muted">CAPSULE Community</span>
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          Tag us in your fits for a chance to be featured. Follow along on Instagram for the latest drops, community spotlights, and behind-the-scenes content.
        </p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {GALLERY.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative aspect-square overflow-hidden rounded-[22px] bg-[#F5F5F5]"
          >
            <div className="flex h-full items-center justify-center text-muted/30">
              <Camera className="h-10 w-10" strokeWidth={1.8} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[13px] font-medium text-secondary">{item.label}</p>
                <p className="text-[11px] text-secondary/60">{item.user}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 rounded-[28px] border border-border p-8 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Share Your Style</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Post a photo wearing your CAPSULE cap, tag us, and use the hashtag #CAPSULEFITS for a chance to be featured on our page.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="primary" href="https://instagram.com">
                <Camera className="h-4 w-4" strokeWidth={1.8} /> Follow Us
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { icon: Camera, label: "@capsule.caps", desc: "Instagram" },
              { icon: MessageCircle, label: "Chat on WhatsApp", desc: "Quick replies" },
              { icon: MapPin, label: "Bengaluru, India", desc: "Based in the garden city" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 rounded-[16px] border border-border p-4">
                <item.icon className="h-5 w-5 text-muted" strokeWidth={1.8} />
                <div className="flex-1">
                  <p className="text-[14px] font-medium">{item.label}</p>
                  <p className="text-[12px] text-muted">{item.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted" strokeWidth={1.8} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
