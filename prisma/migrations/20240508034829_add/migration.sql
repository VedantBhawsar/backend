-- CreateTable
CREATE TABLE "SourceEpisode" (
    "id" TEXT NOT NULL,
    "headers" JSONB NOT NULL,
    "download" TEXT NOT NULL,
    "sourceEpisodeId" TEXT,
    "message" TEXT NOT NULL,

    CONSTRAINT "SourceEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isM3U8" BOOLEAN NOT NULL,
    "quality" TEXT NOT NULL,
    "sourceEpisodeId" TEXT,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_sourceEpisodeId_fkey" FOREIGN KEY ("sourceEpisodeId") REFERENCES "SourceEpisode"("id") ON DELETE SET NULL ON UPDATE CASCADE;
