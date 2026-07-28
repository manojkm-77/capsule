"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function TermsPage() {
  return (
    <div className="container-caps py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
      <div className="mx-auto mt-8 max-w-3xl">
        <h1 className="text-[clamp(2rem,4vw,2.625rem)] font-bold tracking-tight">Terms of Service</h1>
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-muted">
          <p>Last updated: January 2026</p>
          <h2 className="text-lg font-semibold text-primary">Orders & Payment</h2>
          <p>By placing an order, you agree to purchase the selected products at the listed price. Payment is collected at the time of order. We accept UPI, credit/debit cards, and cash on delivery.</p>
          <h2 className="text-lg font-semibold text-primary">Shipping</h2>
          <p>Orders are shipped within 24 hours of confirmation. Delivery times vary by location. Free shipping on orders over ₹999.</p>
          <h2 className="text-lg font-semibold text-primary">Returns & Exchanges</h2>
          <p>We accept returns within 7 days of delivery. Items must be unworn, unwashed, and with all tags attached. Contact us to initiate a return.</p>
          <h2 className="text-lg font-semibold text-primary">Limitation of Liability</h2>
          <p>CAPSULE shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products.</p>
        </div>
      </div>
    </div>
  );
}
