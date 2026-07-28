"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, Truck, CreditCard, Shield } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const STEPS = ["Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const { cart } = useStore();
  const subtotal = cart.reduce((a, b) => a + b.price * b.quantity, 0);
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="container-caps py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="mt-6 text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight">Checkout</h1>

      <div className="mt-8">
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-medium transition-all ${
                i <= step ? "bg-primary text-secondary" : "bg-[#F0F0F0] text-muted"
              }`}>
                {i < step ? <Check className="h-4 w-4" strokeWidth={1.8} /> : i + 1}
              </div>
              <span className={`text-[13px] font-medium ${i <= step ? "text-primary" : "text-muted"}`}>{s}</span>
              {i < STEPS.length - 1 && <ChevronRight className="h-4 w-4 text-muted" strokeWidth={1.8} />}
            </div>
          ))}
        </div>

        <div className="mt-2 h-1 w-full rounded-full bg-[#F0F0F0]">
          <div className="h-1 rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {step === 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-xl font-semibold">Shipping Information</h2>
              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="First Name" placeholder="John" />
                  <Input label="Last Name" placeholder="Doe" />
                </div>
                <Input label="Email" type="email" placeholder="john@example.com" />
                <Input label="Phone" type="tel" placeholder="+91 98765 43210" />
                <Input label="Address" placeholder="123 Main Street" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Input label="City" placeholder="Bengaluru" />
                  <Input label="State" placeholder="Karnataka" />
                  <Input label="PIN Code" placeholder="560001" />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button onClick={() => setStep(1)}>
                  Continue to Payment <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <div className="mt-6 space-y-3">
                {[
                  { icon: CreditCard, label: "Credit/Debit Card", desc: "Visa, Mastercard, RuPay" },
                  { icon: CreditCard, label: "UPI", desc: "Google Pay, PhonePe, Paytm" },
                  { icon: Shield, label: "Cash on Delivery", desc: "Pay when you receive" },
                ].map((method) => (
                  <label key={method.label} className="flex cursor-pointer items-center gap-4 rounded-[20px] border border-border p-5 hover:border-primary transition-all has-checked:border-primary has-checked:bg-primary/5">
                    <input type="radio" name="payment" className="h-4 w-4 accent-primary" />
                    <method.icon className="h-6 w-6 text-muted" strokeWidth={1.8} />
                    <div>
                      <p className="text-[14px] font-medium">{method.label}</p>
                      <p className="text-[12px] text-muted">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
                <Button onClick={() => setStep(2)}>
                  Continue to Review <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-xl font-semibold">Review Your Order</h2>
              <div className="mt-6 space-y-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-4 rounded-[16px] border border-border p-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[12px] bg-[#F5F5F5]">
                      <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium truncate">{item.name}</p>
                      <p className="text-[12px] text-muted">Size: {item.size} &middot; Qty: {item.quantity}</p>
                    </div>
                    <span className="text-[14px] font-semibold">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                <Button>
                  <Shield className="h-4 w-4" strokeWidth={1.8} /> Place Order
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-[100px] rounded-[20px] border border-border p-6">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="mt-4 space-y-2">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-[14px]">
                  <span className="text-muted truncate">{item.name} x{item.quantity}</span>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-[14px]">
                <span className="text-muted">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-muted">Shipping</span>
                <span className="text-success font-medium">Free</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between text-[16px] font-semibold">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
