/*
  Warnings:

  - You are about to drop the column `episodeId` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `episodeNumber` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Episode` table. All the data in the column will be lost.
  - Added the required column `number` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Episode_episodeId_key";

-- DropIndex
DROP INDEX "Episode_episodeNumber_key";

-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "episodeId",
DROP COLUMN "episodeNumber",
DROP COLUMN "image",
DROP COLUMN "title",
ADD COLUMN     "number" INTEGER NOT NULL;
