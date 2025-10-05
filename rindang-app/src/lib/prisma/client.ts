// src/lib/prisma/client.ts

import { PrismaClient } from "@prisma/client";

// GlobalThis untuk menyimpan instance Prisma di development
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Deklarasi global agar TypeScript mengenali properti globalThis.prismaGlobal
declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

// Gunakan instance global jika ada, jika tidak, buat yang baru
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma; // WAJIB: Export sebagai default

// Di lingkungan development, simpan instance di global untuk Hot Reloading
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
