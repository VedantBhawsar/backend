"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const __1 = require("..");
const gogo = new extensions_1.ANIME.Gogoanime();
class AnimeController {
    async fetchSources(req, res) {
        try {
            const id = req.params.id;
            // Check if the SourceEpisode already exists
            let animeExisted = await __1.prismaClient.sourceEpisode.findUnique({
                where: { id: id },
                include: { sources: true },
            });
            if (animeExisted) {
                return res.status(200).json({
                    message: 'Sources fetched successfully',
                    episode: animeExisted,
                });
            }
            // If SourceEpisode doesn't exist, create it first
            const { sources, download, headers } = await gogo.fetchEpisodeSources(id);
            const createdEpisode = await __1.prismaClient.sourceEpisode.create({
                data: {
                    id: id,
                    download: download ?? '',
                    headers: headers ?? '',
                    sources: {
                        create: sources.map((source) => ({
                            url: source.url,
                            isM3U8: source.isM3U8,
                            quality: source.quality,
                        })),
                    },
                },
                include: { sources: true }, // Include the created sources in the response
            });
            res.status(200).json({
                message: 'Sources fetched successfully',
                episode: createdEpisode,
            });
        }
        catch (error) {
            console.error('Error fetching sources:', error);
            res.status(500).json({ message: 'Failed to fetch sources' });
        }
    }
    async fetchAnime(req, res) {
        try {
            const { id } = req.params;
            let animeExisted = await __1.prismaClient.anime.findUnique({
                where: { id: id },
                include: { episodes: true },
            });
            if (animeExisted) {
                return res.status(200).json(animeExisted);
            }
            let anime = await gogo.fetchAnimeInfo(id);
            if (!anime) {
                return res
                    .status(404)
                    .json({ message: `Anime with id ${id} not found` });
            }
            await __1.prismaClient.anime
                .create({
                data: {
                    id: anime.id,
                    title: anime.title,
                    url: anime.url,
                    genres: { set: anime.genres },
                    totalEpisodes: anime.totalEpisodes,
                    image: anime.image,
                    releaseDate: anime.releaseDate,
                    description: anime.description,
                    subOrDub: anime.subOrDub,
                    type: anime.type,
                    status: anime.status,
                    otherName: anime.otherName,
                },
            })
                .catch((err) => console.log(err.message));
            // Insert the episodes
            await Promise.all(anime.episodes.map(async (episode) => {
                return __1.prismaClient.episode.create({
                    data: {
                        id: episode.id,
                        number: episode.number,
                        url: episode.url,
                        animeId: anime.id,
                    },
                });
            })).catch((err) => console.log(err.message));
            return res.status(200).json(anime);
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: 'Failed to fetch episode' });
        }
    }
    async fetchTopAiring(req, res) {
        try {
            const { page } = req.query;
            const { results, currentPage } = await gogo.fetchTopAiring(parseInt(page) ?? 0);
            return res.status(200).json({ currentPage, topAiring: results });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: 'Failed to fetch Top Airing' });
        }
    }
    async fetchRecentFromDB(req, res) { }
    async fetchRecent(req, res) {
        try {
            const { page } = req.query;
            let { results, currentPage } = await gogo.fetchRecentEpisodes(parseInt(page) ?? 0);
            return res.status(200).json({ currentPage, recentAnime: results });
        }
        catch (error) {
            console.error('Error fetching recent episodes:', error);
            return res
                .status(500)
                .json({ message: 'Failed to fetch recent episodes' });
        }
    }
    async fetchPopular(req, res) {
        try {
            const { page } = req.query;
            let { results, currentPage } = await gogo.fetchTopAiring(parseInt(page) ?? 0);
            return res.status(200).json({ currentPage, popularAnime: results });
        }
        catch (error) {
            console.error('Error fetching popular episodes:', error);
            return res
                .status(500)
                .json({ message: 'Failed to fetch popular episodes' });
        }
    }
    async search(req, res) {
        try {
            const { s, page } = req.query;
            let { results } = await gogo.search(s, parseInt(page) ?? 0);
            return res.status(200).json(results);
        }
        catch (error) {
            console.error('Failed to search anime:', error);
            return res.status(500).json({ message: 'Failed to search anime' });
        }
    }
    async fetchServers(req, res) {
        try {
            const { id } = req.params;
            const servers = await gogo.fetchEpisodeServers(id);
            return res.status(200).json(servers);
        }
        catch (error) {
            console.log(error.message);
        }
    }
}
exports.default = new AnimeController();
