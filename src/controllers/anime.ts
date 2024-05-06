import { ANIME } from '@consumet/extensions';
import Zoro from '@consumet/extensions/dist/providers/anime/zoro';
import { Request, Response } from 'express';
import { prismaClient } from '..';

const gogo = new ANIME.Gogoanime();
const zoro = new ANIME.Zoro();
const Anify = new ANIME.Anify();

interface Episode {
  id: string;
  number: number;
  url: string;
}

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
          .json({ message: 'Sources fetched successfully', episode });
        return;
      }
      res
        .status(404)
        .json({ message: 'error while fetching successfully', episode });
      return;
    } catch (error) {
      console.error('Error fetching sources:', error);
      res.status(500).json({ message: 'Failed to fetch sources' });
    }
  }

  async fetchAnime(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let animeExisted = await prismaClient.anime.findUnique({
        where: { id: id },
        include: { episodes: true },
      });
      if (animeExisted) {
        return res.status(200).json({ message: 'Anime', anime: animeExisted });
      }
      let anime: any = await gogo.fetchAnimeInfo(id);
      if (!anime) {
        return res
          .status(404)
          .json({ message: `Anime with id ${id} not found` });
      }

      await prismaClient.anime
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
      await Promise.all(
        anime.episodes.map(async (episode: Episode) => {
          return prismaClient.episode.create({
            data: {
              id: episode.id,
              number: episode.number,
              url: episode.url,
              animeId: anime.id,
            },
          });
        })
      ).catch((err: Error) => console.log(err.message));

      return res.status(200).json(anime);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ message: 'Failed to fetch episode' });
    }
  }

  async fetchTopAiring(req: Request, res: Response) {
    try {
      const topAiring = await gogo.fetchTopAiring();
      return res.status(200).json(topAiring.results);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ message: 'Failed to fetch Top Airing' });
    }
  }

  async fetchRecentFromDB(req: Request, res: Response) {}

  async fetchRecent(req: Request, res: Response) {
    try {
      let response: any = await gogo.fetchRecentEpisodes();
      prismaClient.anime
        .createMany({
          data: response.results,
        })
        .catch((error) => console.log(error));

      return res.status(200).json(response.results);
    } catch (error) {
      console.error('Error fetching recent episodes:', error);
      return res
        .status(500)
        .json({ message: 'Failed to fetch recent episodes' });
    }
  }

  async fetchPopular(req: Request, res: Response) {
    try {
      let response: any = await gogo.fetchTopAiring();
      if (response.results.length === 0) {
        response = await zoro
          .fetchRecentlyUpdated()
          .catch((err) => console.log(err));
      }
      return res.status(200).json(response.results);
    } catch (error) {
      console.error('Error fetching popular episodes:', error);
      return res
        .status(500)
        .json({ message: 'Failed to fetch popular episodes' });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { s } = req.query as { s: string };
      let search: any = await gogo.search(s);
      if (search.results.length === 0) {
        search = await zoro.search(s).catch((err) => console.log(err));
      }
      if (search.results.length === 0) {
        search = await Anify.search(s).catch((err) => console.log(err));
      }
      return res.status(200).json(search.results);
    } catch (error) {
      console.error('Failed to search anime:', error);
      return res.status(500).json({ message: 'Failed to search anime' });
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
