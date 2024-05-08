/*
  Warnings:

  - You are about to drop the column `message` on the `SourceEpisode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `SourceEpisode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SourceEpisode" DROP COLUMN "message";

-- CreateIndex
CREATE UNIQUE INDEX "SourceEpisode_id_key" ON "SourceEpisode"("id");
