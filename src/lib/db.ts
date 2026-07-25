import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function createPrisma() {
  if (!process.env.DATABASE_URL) return null;
  try {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
    return new PrismaClient({ adapter });
  } catch {
    return null;
  }
}

export const prisma = createPrisma();
