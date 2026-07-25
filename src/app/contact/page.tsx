"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Send, Check } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 sm:mb-16 max-w-3xl"
      >
        <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-lime">
          Contact
        </span>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.85] tracking-tight">
          Get in
          <br />
          <span className="text-lime">Touch</span>
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/40">
          DM us on WhatsApp for orders, inquiries, or just to talk caps.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {[
            {
              icon: MessageCircle,
              title: "WhatsApp",
              desc: "Fastest way to reach us. DM for orders.",
              action: "Chat Now",
              href: waLink("Hey CAPSULE! I have a question."),
            },
            {
              icon: Mail,
              title: "Email",
              desc: "For partnerships & bulk inquiries.",
              action: "hello@capsule.caps",
              href: "mailto:hello@capsule.caps",
            },
            {
              icon: MapPin,
              title: "Location",
              desc: "Based in Bengaluru, India.",
              action: "View Map",
              href: "#",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 sm:gap-5 rounded-2xl sm:rounded-3xl border border-white/5 bg-card/50 p-4 sm:p-6 transition-all hover:border-white/10"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-lime/20 bg-lime/5">
                <item.icon className="h-5 w-5 text-lime" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-0.5 text-xs text-white/40">{item.desc}</p>
              </div>
              <Link
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                className="flex items-center gap-1 text-[0.65rem] font-semibold text-lime"
              >
                {item.action}
                <Send className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          className="rounded-3xl border border-white/5 bg-card/50 p-6 sm:p-8"
        >
          <h2 className="font-display text-2xl tracking-tight">
            Send a <span className="text-lime">Message</span>
          </h2>
          <p className="mt-2 text-sm text-white/40">
            We reply within a few hours, usually faster.
          </p>
          <form className="mt-8 space-y-4">
            <div>
              <input
                placeholder="Your Name"
                className="w-full rounded-2xl border border-white/10 bg-dark px-5 py-4 text-sm text-stitch outline-none placeholder:text-white/20 focus:border-lime/30"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-2xl border border-white/10 bg-dark px-5 py-4 text-sm text-stitch outline-none placeholder:text-white/20 focus:border-lime/30"
              />
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full resize-none rounded-2xl border border-white/10 bg-dark px-5 py-4 text-sm text-stitch outline-none placeholder:text-white/20 focus:border-lime/30"
              />
            </div>
            <button
              type="submit"
              onClick={(e) => e.preventDefault()}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-lime py-4 text-[0.75rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/80"
            >
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

function waLink(text: string) {
  return `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
}
