"use client";

import { motion } from "framer-motion";
import { Scissors, MapPin, Shield, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const STATS = [
  { icon: Scissors, value: "5,000+", label: "Caps Crafted" },
  { icon: MapPin, value: "25+", label: "Cities Covered" },
  { icon: Shield, value: "99%", label: "Satisfaction" },
  { icon: Star, value: "4.9", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <div className="container-caps py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">About Us</span>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight">
            Crafting Premium Headwear
            <br />
            <span className="text-muted">Since Day One</span>
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-muted">
            CAPSULE started with a simple belief — that a cap should fit perfectly, last for years, and look better with age. 
            We partner with skilled workshops across India to create headwear that meets the highest standards of quality and design.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Every piece is designed in-house, sampled meticulously, and produced in limited quantities. 
            No shortcuts, no compromises — just exceptional craftsmanship.
          </p>
          <div className="mt-8">
            <Button href="/shop">
              Explore Collection <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="overflow-hidden rounded-[30px] bg-[#F5F5F5]"
        >
          <img
            src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop"
            alt="Our workshop"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-[20px] border border-border p-6 text-center"
          >
            <stat.icon className="mx-auto h-6 w-6 text-muted" strokeWidth={1.8} />
            <p className="mt-3 text-2xl font-bold">{stat.value}</p>
            <p className="mt-1 text-[13px] text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {[
          {
            step: "01",
            title: "Design",
            desc: "Every cap begins as a concept. We obsess over proportions, materials, and construction to create timeless pieces.",
          },
          {
            step: "02",
            title: "Craft",
            desc: "Our workshops bring designs to life using premium fabrics, precise stitching, and rigorous quality checks.",
          },
          {
            step: "03",
            title: "Deliver",
            desc: "Each order is carefully packed and shipped, ensuring your cap arrives in perfect condition.",
          },
        ].map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-[20px] border border-border p-6"
          >
            <span className="text-3xl font-bold text-muted/30">{item.step}</span>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
