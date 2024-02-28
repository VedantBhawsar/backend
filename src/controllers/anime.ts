import { ANIME } from "@consumet/extensions";
import { Request, Response } from "express";

const gogo = new ANIME.Gogoanime();

class AnimeController {
  async fetchSources(req: Request, res: Response) {
    try {
      let episode;
      const id = req.params.id;
      episode = await gogo.fetchEpisodeSources(id).catch((error: any) => {
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
    } catch (error) {
      console.error("Error fetching sources:", error);
      res.status(500).json({ message: "Failed to fetch sources" });
    }
  }

  async fetchAnime(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const episode = await gogo.fetchAnimeInfo(id);
      return res.status(200).json(episode);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ message: "Failed to fetch episode" });
    }
  }

  async fetchTopAiring(req: Request, res: Response) {
    try {
      const topAiring = await gogo.fetchTopAiring();
      return res.status(200).json(topAiring.results);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ message: "Failed to fetch Top Airing" });
    }
  }

  async fetchRecent(req: Request, res: Response) {
    try {
      const recent = await gogo.fetchRecentEpisodes();
      return res.status(200).json(recent.results);
    } catch (error) {
      console.error("Error fetching recent episodes:", error);
      return res
        .status(500)
        .json({ message: "Failed to fetch recent episodes" });
    }
  }

  async fetchPopular(req: Request, res: Response) {
    try {
      const popular = await gogo.fetchTopAiring();
      return res.status(200).json(popular.results);
    } catch (error) {
      console.error("Error fetching popular episodes:", error);
      return res
        .status(500)
        .json({ message: "Failed to fetch popular episodes" });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { s } = req.query as { s: string };
      const search = await gogo.search(s);
      return res.status(200).json(search.results);
    } catch (error) {
      console.error("Failed to search anime:", error);
      return res.status(500).json({ message: "Failed to search anime" });
    }
  }

  async fetchServers(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const servers = await gogo.fetchEpisodeServers(id);
      return res.status(200).json(servers);
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
export default new AnimeController();
