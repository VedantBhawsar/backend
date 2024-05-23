import { ANIME } from '@consumet/extensions';
import Zoro from '@consumet/extensions/dist/providers/anime/zoro';
import { Request, Response } from 'express';
import { prismaClient } from '../index';

const gogo = new ANIME.Gogoanime();

interface Episode {
  id: string;
  number: number;
  url: string;
}

class AnimeController {
  async fetchSources(req: Request, res: Response) {
    try {
      const id = req.params.id;

      // Check if the SourceEpisode already exists
      let animeExisted = await prismaClient.sourceEpisode.findUnique({
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

      const createdEpisode = await prismaClient.sourceEpisode.create({
        data: {
          id: id,
          download: download ?? '',
          headers: headers ?? '',
          sources: {
            create: sources.map((source: any) => ({
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
        return res.status(200).json(animeExisted);
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
        .catch((error:any) => console.log(error.message));

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
      const { page } = req.query as { page: string };
      const { results, currentPage } = await gogo.fetchTopAiring(
        parseInt(page) ?? 0
      );
      return res.status(200).json({ currentPage, topAiring: results });
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ message: 'Failed to fetch Top Airing' });
    }
  }

  async fetchRecentFromDB(req: Request, res: Response) {}

  async fetchRecent(req: Request, res: Response) {
    try {
      const { page } = req.query as { page: string };
      let { results, currentPage } = await gogo.fetchRecentEpisodes(
        parseInt(page) ?? 0
      );
      return res.status(200).json({ currentPage, recentAnime: results });
    } catch (error) {
      console.error('Error fetching recent episodes:', error);
      return res
        .status(500)
        .json({ message: 'Failed to fetch recent episodes' });
    }
  }

  async fetchPopular(req: Request, res: Response) {
    try {
      const { page } = req.query as { page: string };
      let { results, currentPage } = await gogo.fetchTopAiring(
        parseInt(page) ?? 0
      );
      return res.status(200).json({ currentPage, popularAnime: results });
    } catch (error) {
      console.error('Error fetching popular episodes:', error);
      return res
        .status(500)
        .json({ message: 'Failed to fetch popular episodes' });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { s, page } = req.query as { s: string; page: string };
      let { results } = await gogo.search(s, parseInt(page) ?? 0);
      return res.status(200).json(results);
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
