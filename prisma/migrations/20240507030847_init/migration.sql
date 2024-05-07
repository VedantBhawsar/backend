/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Anime` will be added. If there are existing duplicate values, this will fail.
  - Made the column `url` on table `Episode` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number` on table `Episode` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Episode" ALTER COLUMN "url" SET NOT NULL,
ALTER COLUMN "number" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Anime_id_key" ON "Anime"("id");
