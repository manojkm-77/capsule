import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  await prisma.product.createMany({ data: [
    { id: "1", name: "Court Black Fitted", category: "Fitted", price: 1499, originalPrice: 2499, stock: 3, color: "#0B0B0B", badge: "Low Stock" },
    { id: "2", name: "Lime Snapback", category: "Snapback", price: 1699, originalPrice: 2699, stock: 24, color: "#1a1a1a", badge: "Best Seller" },
    { id: "3", name: "Shadow Dad Hat", category: "Dad Hat", price: 1299, originalPrice: 1999, stock: 8, color: "#161616", badge: "New" },
    { id: "4", name: "Onyx Fitted", category: "Fitted", price: 1499, originalPrice: 2499, stock: 2, color: "#0D0D0D", badge: "Limited" },
    { id: "5", name: "Stealth Snap", category: "Snapback", price: 1599, originalPrice: 2599, stock: 12, color: "#141414", badge: "Popular" },
    { id: "6", name: "Split Black Fitted", category: "Limited", price: 1899, originalPrice: 2999, stock: 1, color: "#0B0B0B", badge: "Last One" },
    { id: "7", name: "Nocturnal Camo Snap", category: "Snapback", price: 1799, originalPrice: 2799, stock: 6, color: "#111111", badge: "Exclusive" },
    { id: "8", name: "Bone White Dad Hat", category: "Dad Hat", price: 1399, originalPrice: 2199, stock: 15, color: "#1c1c1c", badge: "New" },
  ]});

  await prisma.order.createMany({ data: [
    { orderId: "ORD-001", customer: "Aarav Menon", handle: "+91 98450 11234", product: "Court Black Fitted", amount: 1499, status: "new", date: new Date("2026-07-20") },
    { orderId: "ORD-002", customer: "Ishita Rao", handle: "@ishi.rao", product: "Lime Snapback", amount: 1699, status: "confirmed", date: new Date("2026-07-19") },
    { orderId: "ORD-003", customer: "Dev Patel", handle: "+91 99870 44521", product: "Shadow Dad Hat", amount: 1299, status: "shipped", date: new Date("2026-07-18") },
    { orderId: "ORD-004", customer: "Sana Qureshi", handle: "@sanaq", product: "Onyx Fitted", amount: 1499, status: "delivered", date: new Date("2026-07-16") },
    { orderId: "ORD-005", customer: "Rohan Nair", handle: "+91 90080 77123", product: "Stealth Snap", amount: 1599, status: "new", date: new Date("2026-07-22") },
    { orderId: "ORD-006", customer: "Meher Singh", handle: "@meher.exe", product: "Split Black Fitted", amount: 1899, status: "cancelled", date: new Date("2026-07-15") },
    { orderId: "ORD-007", customer: "Tanvi Shah", handle: "+91 88790 55210", product: "Lime Snapback", amount: 1699, status: "delivered", date: new Date("2026-07-14") },
    { orderId: "ORD-008", customer: "Zoya Khan", handle: "@zoyakh", product: "Nocturnal Camo Snap", amount: 1799, status: "confirmed", date: new Date("2026-07-21") },
  ]});

  await prisma.drop.createMany({ data: [
    { number: 1, title: "The Black Originals", description: "Where it started — court black, onyx, stealth.", status: "sold_out", date: new Date("2026-03-15") },
    { number: 2, title: "Dad Hat Season", description: "Unstructured fits for the off-duty rotation.", status: "sold_out", date: new Date("2026-04-20") },
    { number: 3, title: "Split Monochrome", description: "Limited two-tone run — almost gone.", status: "live", date: new Date("2026-07-01") },
    { number: 4, title: "Neon Capsule", description: "New patches, new laces, restocked fitted.", status: "upcoming", date: new Date("2026-08-01") },
  ]});

  await prisma.testimonial.createMany({ data: [
    { name: "Rhea Sharma", handle: "@rhea.wears", text: "Best caps I've ever owned. The quality is unmatched and the fits are incredible.", rating: 5, location: "Bengaluru" },
    { name: "Kabir Kapoor", handle: "@kabir.k", text: "Lime snap + black tee combo never misses. My go-to brand now.", rating: 5, location: "Mumbai" },
    { name: "Ananya Patel", handle: "@ananya.style", text: "The Court Black Fitted is a masterpiece. Instant classic.", rating: 5, location: "Delhi" },
    { name: "Vikram Raj", handle: "@vik.rd", text: "Stealth Snap in Goa was the vibe. Everyone asked where I got it.", rating: 5, location: "Goa" },
    { name: "Harsh Chauhan", handle: "@theharshc", text: "Onyx fitted, everyday rotation. Never taking this off.", rating: 4, location: "Pune" },
  ]});

  await prisma.fAQ.createMany({ data: [
    { question: "How do I order?", answer: "Browse our collection and DM us on WhatsApp with the product you want. We'll confirm size, availability, and payment details." },
    { question: "What payment methods do you accept?", answer: "UPI, Google Pay, PhonePe, and Cash on Delivery in most cities. No card details needed." },
    { question: "How long does shipping take?", answer: "2-4 days in Bengaluru, 4-7 days pan-India. You'll get tracking over WhatsApp." },
    { question: "Can I return or exchange?", answer: "Yes — DM us within 3 days of delivery and we'll sort an exchange subject to stock availability." },
    { question: "Do you ship internationally?", answer: "Currently shipping pan-India only. International shipping coming soon." },
    { question: "How do I know my size?", answer: "Most fits are adjustable one-size. Fitted styles come in set sizes — DM us and we'll confirm fit before you pay." },
  ]});

  await prisma.customer.createMany({ data: [
    { name: "Aarav Menon", email: "aarav@example.com", phone: "+91 98450 11234", city: "Bengaluru", orders: 3, lastOrder: new Date("2026-07-20") },
    { name: "Ishita Rao", email: "ishita@example.com", phone: "+91 99870 44521", city: "Mumbai", orders: 5, lastOrder: new Date("2026-07-19") },
    { name: "Dev Patel", email: "dev@example.com", phone: "+91 90080 77123", city: "Ahmedabad", orders: 2, lastOrder: new Date("2026-07-18") },
    { name: "Sana Qureshi", email: "sana@example.com", phone: "+91 88790 55210", city: "Delhi", orders: 4, lastOrder: new Date("2026-07-16") },
    { name: "Rohan Nair", email: "rohan@example.com", phone: "+91 90080 77123", city: "Kochi", orders: 1, lastOrder: new Date("2026-07-22") },
    { name: "Meher Singh", email: "meher@example.com", phone: "+91 88790 55210", city: "Chandigarh", orders: 2, lastOrder: new Date("2026-07-15") },
    { name: "Tanvi Shah", email: "tanvi@example.com", phone: "+91 98450 11234", city: "Pune", orders: 3, lastOrder: new Date("2026-07-14") },
    { name: "Zoya Khan", email: "zoya@example.com", phone: "+91 99870 44521", city: "Hyderabad", orders: 6, lastOrder: new Date("2026-07-21") },
  ]});

  await prisma.coupon.createMany({ data: [
    { code: "WELCOME10", discount: "10% OFF", min: "₹999", usage: 45, expires: new Date("2026-12-31"), active: true },
    { code: "DROP004", discount: "15% OFF", min: "₹1,499", usage: 23, expires: new Date("2026-08-15"), active: true },
    { code: "FREESHIP", discount: "Free Shipping", min: "₹999", usage: 78, expires: new Date("2026-12-31"), active: true },
    { code: "FLAT500", discount: "₹500 OFF", min: "₹2,499", usage: 12, expires: new Date("2026-09-30"), active: false },
  ]});

  await prisma.category.createMany({ data: [
    { name: "Fitted", productCount: 3 },
    { name: "Snapback", productCount: 3 },
    { name: "Dad Hat", productCount: 2 },
    { name: "Limited", productCount: 1 },
  ]});

  await prisma.user.createMany({ data: [
    { name: "Riya Sharma", email: "riya@capsule.in", role: "Admin", status: "Active" },
    { name: "Arjun Mehta", email: "arjun@capsule.in", role: "Editor", status: "Active" },
    { name: "Priya Kapoor", email: "priya@capsule.in", role: "Viewer", status: "Inactive" },
  ]});

  await prisma.banner.createMany({ data: [
    { title: "Summer Collection 2026", active: true, expires: new Date("2026-08-31") },
    { title: "Drop 004 Launch", active: true, expires: new Date("2026-08-15") },
    { title: "Monsoon Sale", active: false, expires: new Date("2026-07-31") },
  ]});

  await prisma.blog.createMany({ data: [
    { title: "The Story Behind Court Black", author: "Riya", date: new Date("2026-07-15"), views: 234 },
    { title: "How We Choose Our Drops", author: "Riya", date: new Date("2026-07-10"), views: 189 },
    { title: "Behind the Scenes: Drop 004", author: "Team", date: new Date("2026-07-05"), views: 312 },
  ]});

  await prisma.review.createMany({ data: [
    { name: "Rhea Sharma", rating: 5, text: "Best cap I've ever owned. The quality is unmatched.", product: "Court Black Fitted", date: new Date("2026-07-20"), approved: true },
    { name: "Kabir Kapoor", rating: 5, text: "Lime snap + black tee combo never misses.", product: "Lime Snapback", date: new Date("2026-07-18"), approved: true },
    { name: "Ananya Patel", rating: 4, text: "Great quality but runs a bit large.", product: "Court Black Fitted", date: new Date("2026-07-16"), approved: false },
    { name: "Vikram Raj", rating: 5, text: "Stealth Snap in Goa was the vibe!", product: "Stealth Snap", date: new Date("2026-07-14"), approved: false },
  ]});

  await prisma.notification.createMany({ data: [
    { title: "New order received", desc: "Aarav Menon ordered Court Black Fitted", time: "5m ago", type: "order" },
    { title: "Low stock alert", desc: "Court Black Fitted has only 2 left", time: "1h ago", type: "alert" },
    { title: "Drop scheduled", desc: "Drop 004 is set for August 1st", time: "3h ago", type: "info" },
    { title: "Payment received", desc: "₹1,499 received from Dev Patel", time: "6h ago", type: "payment" },
    { title: "New customer registered", desc: "Zoya Khan joined", time: "1d ago", type: "info" },
  ]});

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
