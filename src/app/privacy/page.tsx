"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function PrivacyPage() {
  return (
    <div className="container-caps py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <div className="mx-auto mt-8 max-w-3xl">
        <h1 className="text-[clamp(2rem,4vw,2.625rem)] font-bold tracking-tight">Privacy Policy</h1>
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-muted">
          <p>Last updated: January 2026</p>
          <h2 className="text-lg font-semibold text-primary">Information We Collect</h2>
          <p>We collect information you provide directly, such as your name, email address, phone number, and shipping address when you place an order or create an account.</p>
          <h2 className="text-lg font-semibold text-primary">How We Use Your Information</h2>
          <p>We use your information to process orders, communicate with you about your purchases, and improve our products and services. We do not sell your personal information to third parties.</p>
          <h2 className="text-lg font-semibold text-primary">Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          <h2 className="text-lg font-semibold text-primary">Contact</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at hello@capsule.caps.</p>
        </div>
      </div>
    </div>
  );
}
