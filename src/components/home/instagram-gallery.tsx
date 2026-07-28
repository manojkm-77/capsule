"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=400&auto=format&fit=crop",
];

export function InstagramGallery() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container-caps">
        <div className="text-center mb-8">
          <Camera className="mx-auto h-5 w-5 text-muted mb-2" strokeWidth={1.8} />
          <h2 className="text-xl font-bold tracking-tight">Follow Us</h2>
          <p className="mt-1 text-[13px] text-muted">@capsule.caps &middot; Tag us for a feature</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {images.map((img, i) => (
            <motion.a
              key={i}
              href="#"
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-[16px] bg-secondary"
            >
              <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
