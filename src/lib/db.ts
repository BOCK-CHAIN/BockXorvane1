// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const db =
//   globalForPrisma.prisma ||
//   new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

import { PrismaClient as Main } from "@/../prisma/generated/main";
import { PrismaClient as WebBuild } from "@/../prisma/generated/webbuild";

const main = new Main();
const db = new WebBuild();

const globalForPrisma = global as unknown as {
  main?: typeof main;
  db?: typeof db;
};

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.main = main;
  globalForPrisma.db = db;
}

export { main, db };
