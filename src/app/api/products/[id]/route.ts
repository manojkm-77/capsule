import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!prisma) return NextResponse.json({ error: "Database offline" }, { status: 503 });
  const { id } = await params;
  const body = await req.json();
  const product = await prisma.product.update({ where: { id }, data: body });
  return NextResponse.json(product);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!prisma) return NextResponse.json({ error: "Database offline" }, { status: 503 });
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
