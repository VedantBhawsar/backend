/*
  Warnings:

  - You are about to drop the column `newsId` on the `Preview` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Preview" DROP CONSTRAINT "Preview_newsId_fkey";

-- DropIndex
DROP INDEX "Preview_newsId_key";

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "previewId" TEXT;

-- AlterTable
ALTER TABLE "Preview" DROP COLUMN "newsId";
