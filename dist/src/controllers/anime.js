"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const gogo = new extensions_1.ANIME.Gogoanime();
const zoro = new extensions_1.ANIME.Zoro();
const Anify = new extensions_1.ANIME.Anify();
class AnimeController {
    async fetchSources(req, res) {
        try {
            let episode;
            const id = req.params.id;
            episode = await gogo.fetchEpisodeSources(id).catch((error) => {
                console.log(error.message);
            });
            if (episode) {
                res
                    .status(200)
                    .json({ message: "Sources fetched successfully", episode });
                return;
            }
            res
                .status(404)
                .json({ message: "error while fetching successfully", episode });
            return;
        }
        catch (error) {
            console.error("Error fetching sources:", error);
            res.status(500).json({ message: "Failed to fetch sources" });
        }
    }
    async fetchAnime(req, res) {
        try {
            const { id } = req.params;
            const episode = await gogo.fetchAnimeInfo(id);
            return res.status(200).json(episode);
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Failed to fetch episode" });
        }
    }
    async fetchTopAiring(req, res) {
        try {
            const topAiring = await gogo.fetchTopAiring();
            return res.status(200).json(topAiring.results);
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Failed to fetch Top Airing" });
        }
    }
    async fetchRecent(req, res) {
        try {
            let response = await gogo.fetchRecentEpisodes();
            if (response.results.length === 0) {
                response = await zoro
                    .fetchRecentlyAdded()
                    .catch((err) => console.log(err));
            }
            return res.status(200).json(response.results);
        }
        catch (error) {
            console.error("Error fetching recent episodes:", error);
            return res
                .status(500)
                .json({ message: "Failed to fetch recent episodes" });
        }
    }
    async fetchPopular(req, res) {
        try {
            let response = await gogo.fetchTopAiring();
            if (response.results.length === 0) {
                response = await zoro
                    .fetchRecentlyUpdated()
                    .catch((err) => console.log(err));
            }
            return res.status(200).json(response.results);
        }
        catch (error) {
            console.error("Error fetching popular episodes:", error);
            return res
                .status(500)
                .json({ message: "Failed to fetch popular episodes" });
        }
    }
    async search(req, res) {
        try {
            const { s } = req.query;
            let search = await gogo.search(s);
            if (search.results.length === 0) {
                search = await zoro.search(s).catch((err) => console.log(err));
            }
            if (search.results.length === 0) {
                search = await Anify.search(s).catch((err) => console.log(err));
            }
            return res.status(200).json(search.results);
        }
        catch (error) {
            console.error("Failed to search anime:", error);
            return res.status(500).json({ message: "Failed to search anime" });
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
