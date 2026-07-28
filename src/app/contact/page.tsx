"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Send, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const CONTACT_METHODS = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    desc: "Fastest way to reach us. DM for orders.",
    action: "Chat Now",
    href: "https://wa.me/918088145310",
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
    action: "Get Directions",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <div className="container-caps py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Contact</span>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight">
            Let&apos;s Talk
            <br />
            <span className="text-muted">Premium Headwear</span>
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-muted">
            Whether you have a question about sizing, want to check stock, or just want to say hi — we&apos;re here to help.
          </p>

          <div className="mt-10 space-y-4">
            {CONTACT_METHODS.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener"
                className="flex items-center gap-5 rounded-[20px] border border-border p-5 transition-all hover:border-primary hover:bg-[#F5F5F5] group"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#F5F5F5]">
                  <method.icon className="h-5 w-5 text-muted" strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-medium">{method.title}</h3>
                  <p className="text-[13px] text-muted">{method.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all" strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          className="rounded-[28px] border border-border bg-secondary p-8"
        >
          <h2 className="text-xl font-semibold">Send a Message</h2>
          <p className="mt-2 text-[14px] text-muted">We reply within 24 hours, usually faster.</p>
          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Name" placeholder="Your name" />
              <Input label="Email" type="email" placeholder="your@email.com" />
            </div>
            <Input label="Subject" placeholder="How can we help?" />
            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-primary/70">Message</label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full resize-none rounded-[16px] border border-border bg-secondary px-4 py-3 text-[15px] text-primary outline-none placeholder:text-muted/50 focus:border-primary transition-all"
              />
            </div>
            <Button className="w-full">
              <Send className="h-4 w-4" strokeWidth={1.8} /> Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
