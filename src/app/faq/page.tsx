"use client";

import { Accordion } from "@/components/ui/accordion";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { faqs } from "@/lib/data";

export default function FAQPage() {
  return (
    <div className="container-caps py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

      <div className="mx-auto mt-8 max-w-3xl">
        <div className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">FAQ</span>
          <h1 className="mt-3 text-[clamp(2rem,4vw,2.625rem)] font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-[15px] text-muted">
            Everything you need to know about ordering from CAPSULE.
          </p>
        </div>

        <div className="mt-12">
          <Accordion
            items={faqs.map((faq) => ({
              title: faq.question,
              content: faq.answer,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
