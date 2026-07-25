import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  if (!prisma) return NextResponse.json({ error: "Database offline" }, { status: 503 });
  const drops = await prisma.drop.findMany({ orderBy: { number: "asc" } });
  return NextResponse.json(drops);
}

export async function POST(req: Request) {
  if (!prisma) return NextResponse.json({ error: "Database offline" }, { status: 503 });
  const body = await req.json();
  const drop = await prisma.drop.create({ data: { ...body, date: new Date(body.date) } });
  return NextResponse.json(drop);
}
