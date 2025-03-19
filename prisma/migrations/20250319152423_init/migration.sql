/*
  Warnings:

  - You are about to drop the column `connectAccountId` on the `SubAccount` table. All the data in the column will be lost.
  - You are about to drop the column `connectAccountSecret` on the `SubAccount` table. All the data in the column will be lost.
  - You are about to drop the `AddOns` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AddOns" DROP CONSTRAINT "AddOns_agencyId_fkey";

-- AlterTable
ALTER TABLE "SubAccount" DROP COLUMN "connectAccountId",
DROP COLUMN "connectAccountSecret";

-- DropTable
DROP TABLE "AddOns";
