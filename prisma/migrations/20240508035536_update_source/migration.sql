/*
  Warnings:

  - You are about to drop the column `sourceEpisodeId` on the `Source` table. All the data in the column will be lost.
  - You are about to drop the column `sourceEpisodeId` on the `SourceEpisode` table. All the data in the column will be lost.
  - Added the required column `episodeId` to the `Source` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_sourceEpisodeId_fkey";

-- AlterTable
ALTER TABLE "Source" DROP COLUMN "sourceEpisodeId",
ADD COLUMN     "episodeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SourceEpisode" DROP COLUMN "sourceEpisodeId";

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "SourceEpisode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
