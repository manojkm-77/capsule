import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  if (!prisma) return NextResponse.json({ error: "Database offline" }, { status: 503 });
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  if (!prisma) return NextResponse.json({ error: "Database offline" }, { status: 503 });
  const body = await req.json();
  const product = await prisma.product.create({ data: body });
  return NextResponse.json(product);
}
