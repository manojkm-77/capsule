import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const orders = await prisma.order.findMany({ orderBy: { date: "desc" } });
  return NextResponse.json(orders);
}

export async function PUT(req: Request) {
  const { id, status } = await req.json();
  const order = await prisma.order.update({ where: { id }, data: { status } });
  return NextResponse.json(order);
}
