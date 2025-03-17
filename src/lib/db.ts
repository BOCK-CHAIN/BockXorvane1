import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// import { PrismaClient as Main } from "@/../prisma/generated/main";
// import { PrismaClient as WebBuild } from "@/../prisma/generated/webbuild";

// const globalForPrisma = globalThis as unknown as {
//   main?: Main;
//   db?: WebBuild;
// };

// export const main = globalForPrisma.main ?? new Main();
// export const db = globalForPrisma.db ?? new WebBuild();

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.main = main;
//   globalForPrisma.db = db;
// }
