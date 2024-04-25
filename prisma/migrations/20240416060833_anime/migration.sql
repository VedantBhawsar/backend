-- CreateTable
CREATE TABLE "Anime" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "genres" TEXT[],
    "totalEpisodes" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "description" TEXT,
    "subOrDub" TEXT,
    "type" TEXT,
    "status" TEXT,
    "otherName" TEXT,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "episodeId" TEXT NOT NULL,
    "episodeNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "uploadedAt" TEXT NOT NULL,
    "topics" TEXT[],
    "thumbnail" TEXT NOT NULL,
    "thumbnailHash" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preview" (
    "id" TEXT NOT NULL,
    "intro" TEXT,
    "full" TEXT,
    "newsId" TEXT NOT NULL,

    CONSTRAINT "Preview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamingSite" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "StreamingSite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Episode_episodeId_key" ON "Episode"("episodeId");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_episodeNumber_key" ON "Episode"("episodeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Preview_newsId_key" ON "Preview"("newsId");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preview" ADD CONSTRAINT "Preview_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
