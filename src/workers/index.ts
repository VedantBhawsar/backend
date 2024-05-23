import axios from 'axios';
import { API_URL } from '../config';
import { ANIME } from '@consumet/extensions';
import { Episode } from '@prisma/client';
import { prismaClient } from '../index';

const gogo = new ANIME.Gogoanime();

class Workers {
  constructor() {
    this.fetchNews();
  }
  public async fetchNews() {
    try {
      console.log('Fetching news');
      await axios.get(API_URL + 'news/fetch-feeds');
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async fetchRecentAnime() {
    try {
      const { data } = await axios.get(API_URL + 'anime/recent');
      data.recentAnime.map(async (anime: any) => {
        let animeExisted = await prismaClient.anime
          .findUnique({
            where: { id: anime.id },
            include: { episodes: true },
          })
          .catch((err) => console.log(err.message));
        if (animeExisted) {
          let anime: any = await gogo.fetchAnimeInfo(animeExisted.id);
          prismaClient.anime.update({
            where: { id: anime.id },
            data: {
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
          });
          return;
        } else {
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
          console.log('success');
          return;
        }
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export default Workers;
