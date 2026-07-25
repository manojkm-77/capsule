import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const product = await prisma.product.create({ data: body });
  return NextResponse.json(product);
}
