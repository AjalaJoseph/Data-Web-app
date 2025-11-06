import { PrismaClient } from "@prisma/client";

let prisma;

// Prevent multiple Prisma instances during Next.js hot reload
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["query", "error", "warn"],
    });
  }
  prisma = global.prisma;
}

export default prisma;
