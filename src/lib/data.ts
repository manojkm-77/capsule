import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const products = [
  { id: "1", name: "Court Black Fitted", category: "Fitted", description: "Premium structured fitted cap with a classic low-profile crown and embroidered logo. Crafted from 100% cotton for durability.", price: 1499, originalPrice: 2499, stock: 3, color: "#0B0B0B", images: ["/products/product-1.jpg", "/products/product-1.jpg", "/products/product-4.svg", "/products/product-1.jpg", "/products/product-4.svg"], badge: "Low Stock", brand: "CAPSULE", rating: 5, reviewCount: 42, colors: ["#0B0B0B", "#1a1a1a"] },
  { id: "2", name: "Lime Snapback", category: "Snapback", description: "Bold snapback cap featuring a vibrant lime crown and flat brim. Adjustable snap closure ensures a perfect fit for all head sizes.", price: 1699, originalPrice: 2699, stock: 24, color: "#1a1a1a", images: ["/products/product-2.svg", "/products/product-2.svg", "/products/product-5.svg", "/products/product-2.svg", "/products/product-5.svg"], badge: "Best Seller", brand: "CAPSULE", rating: 4, reviewCount: 28, colors: ["#1a1a1a", "#CCFF00"] },
  { id: "3", name: "Shadow Dad Hat", category: "Dad Hat", description: "Relaxed dad hat with a pre-curved brim and a comfortable unstructured fit. Features a subtle tonal embroidered logo.", price: 1299, originalPrice: 1999, stock: 8, color: "#161616", images: ["/products/product-3.svg", "/products/product-3.svg", "/products/product-6.svg", "/products/product-3.svg", "/products/product-6.svg"], badge: "New", brand: "CAPSULE", rating: 5, reviewCount: 16, colors: ["#161616", "#2a2a2a"] },
  { id: "4", name: "Onyx Fitted", category: "Fitted", description: "Sleek onyx fitted cap with a deep crown and structured fit. Embroidered logo on front panels for a premium finish.", price: 1499, originalPrice: 2499, stock: 2, color: "#0D0D0D", images: ["/products/product-4.svg", "/products/product-4.svg", "/products/product-7.svg", "/products/product-4.svg", "/products/product-7.svg"], badge: "Limited", brand: "CAPSULE", rating: 5, reviewCount: 34, colors: ["#0D0D0D"] },
  { id: "5", name: "Stealth Snap", category: "Snapback", description: "Stealth-inspired snapback with all-over tonal construction and matte finish. Flat brim with full snap closure.", price: 1599, originalPrice: 2599, stock: 12, color: "#141414", images: ["/products/product-5.svg", "/products/product-5.svg", "/products/product-1.svg", "/products/product-5.svg", "/products/product-1.svg"], badge: "Popular", brand: "CAPSULE", rating: 4, reviewCount: 19, colors: ["#141414", "#0B0B0B"] },
  { id: "6", name: "Split Black Fitted", category: "Limited", description: "Limited edition split-panel fitted cap featuring contrast stitching. High-crown structured fit with embroidered detailing.", price: 1899, originalPrice: 2999, stock: 1, color: "#0B0B0B", images: ["/products/product-6.svg", "/products/product-6.svg", "/products/product-3.svg", "/products/product-6.svg", "/products/product-3.svg"], badge: "Last One", brand: "CAPSULE", rating: 5, reviewCount: 8, colors: ["#0B0B0B"] },
  { id: "7", name: "Nocturnal Camo Snap", category: "Snapback", description: "Night camo snapback with all-over print and tonal branding. Adjustable snapback closure with flat brim.", price: 1799, originalPrice: 2799, stock: 6, color: "#111111", images: ["/products/product-7.svg", "/products/product-7.svg", "/products/product-2.svg", "/products/product-7.svg", "/products/product-2.svg"], badge: "Exclusive", brand: "CAPSULE", rating: 4, reviewCount: 12, colors: ["#111111"] },
  { id: "8", name: "Bone White Dad Hat", category: "Dad Hat", description: "Clean bone-white dad hat with a slightly curved brim and relaxed crown. Garment-wash gives it a lived-in feel.", price: 1399, originalPrice: 2199, stock: 15, color: "#1c1c1c", images: ["/products/product-8.svg", "/products/product-8.svg", "/products/product-5.svg", "/products/product-8.svg", "/products/product-5.svg"], badge: "New", brand: "CAPSULE", rating: 5, reviewCount: 21, colors: ["#1c1c1c", "#FAFAF7"] },
];

export const orders = [
  { id: "ORD-001", customer: "Aarav Menon", handle: "+91 98450 11234", product: "Court Black Fitted", amount: 1499, status: "new", date: "2026-07-20" },
  { id: "ORD-002", customer: "Ishita Rao", handle: "@ishi.rao", product: "Lime Snapback", amount: 1699, status: "confirmed", date: "2026-07-19" },
  { id: "ORD-003", customer: "Dev Patel", handle: "+91 99870 44521", product: "Shadow Dad Hat", amount: 1299, status: "shipped", date: "2026-07-18" },
  { id: "ORD-004", customer: "Sana Qureshi", handle: "@sanaq", product: "Onyx Fitted", amount: 1499, status: "delivered", date: "2026-07-16" },
  { id: "ORD-005", customer: "Rohan Nair", handle: "+91 90080 77123", product: "Stealth Snap", amount: 1599, status: "new", date: "2026-07-22" },
  { id: "ORD-006", customer: "Meher Singh", handle: "@meher.exe", product: "Split Black Fitted", amount: 1899, status: "cancelled", date: "2026-07-15" },
  { id: "ORD-007", customer: "Tanvi Shah", handle: "+91 88790 55210", product: "Lime Snapback", amount: 1699, status: "delivered", date: "2026-07-14" },
  { id: "ORD-008", customer: "Zoya Khan", handle: "@zoyakh", product: "Nocturnal Camo Snap", amount: 1799, status: "confirmed", date: "2026-07-21" },
];

export const drops = [
  { id: "1", number: 1, title: "The Black Originals", description: "Where it started — court black, onyx, stealth.", status: "sold_out", date: "2026-03-15" },
  { id: "2", number: 2, title: "Dad Hat Season", description: "Unstructured fits for the off-duty rotation.", status: "sold_out", date: "2026-04-20" },
  { id: "3", number: 3, title: "Split Monochrome", description: "Limited two-tone run — almost gone.", status: "live", date: "2026-07-01" },
  { id: "4", number: 4, title: "Neon Capsule", description: "New patches, new laces, restocked fitted.", status: "upcoming", date: "2026-08-01" },
];

export const testimonials = [
  { id: "1", name: "Rhea Sharma", handle: "@rhea.wears", text: "Best caps I've ever owned. The quality is unmatched and the fits are incredible.", rating: 5, location: "Bengaluru" },
  { id: "2", name: "Kabir Kapoor", handle: "@kabir.k", text: "Lime snap + black tee combo never misses. My go-to brand now.", rating: 5, location: "Mumbai" },
  { id: "3", name: "Ananya Patel", handle: "@ananya.style", text: "The Court Black Fitted is a masterpiece. Instant classic.", rating: 5, location: "Delhi" },
  { id: "4", name: "Vikram Raj", handle: "@vik.rd", text: "Stealth Snap in Goa was the vibe. Everyone asked where I got it.", rating: 5, location: "Goa" },
  { id: "5", name: "Harsh Chauhan", handle: "@theharshc", text: "Onyx fitted, everyday rotation. Never taking this off.", rating: 4, location: "Pune" },
];

export const faqs = [
  { id: "1", question: "How do I place an order?", answer: "Browse our collection, select your preferred items, add them to cart, and proceed to checkout. You can pay via UPI, credit/debit card, or cash on delivery." },
  { id: "2", question: "What payment methods do you accept?", answer: "We accept UPI (Google Pay, PhonePe, Paytm), credit/debit cards, and Cash on Delivery in most areas." },
  { id: "3", question: "How long does shipping take?", answer: "Orders ship within 24 hours. Delivery takes 2-4 days in Bengaluru, 4-7 days for the rest of India." },
  { id: "4", question: "Can I return or exchange?", answer: "Yes — contact us within 7 days of delivery for a return or exchange. Items must be unworn with tags attached." },
  { id: "5", question: "Do you ship internationally?", answer: "Currently shipping pan-India only. International shipping coming soon." },
  { id: "6", question: "How do I find my size?", answer: "Most styles are adjustable one-size. Fitted caps come in specific sizes — refer to our size guide or contact us for help." },
];
