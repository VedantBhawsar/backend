import axios from 'axios';
import { API_URL } from '../config';
import { ANIME } from '@consumet/extensions';
import { Episode } from '@prisma/client';
import { prismaClient } from '../index';
import { skip } from 'node:test';

const gogo = new ANIME.Gogoanime();

class Workers {
  constructor() {
    // this.fetchNews();
    this.fetchRecentAnime()
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
      const { data } = await axios.get("https://ninjanex-backend-production.up.railway.app/" + 'anime/recent');
      data.recentAnime.map(async (anime1: any) => {
        let animeExisted = await prismaClient.anime
          .findUnique({
            where: { id: anime1.id },
            include: { episodes: true },
          })
          .catch((err) => console.log(err.message));
          let {data: anime}: any = await axios.get(`https://ninjanex-backend-production.up.railway.app/anime/fetch/${anime1.id}`).catch((error: Error)=> console.log(error.message))
          if (animeExisted) {
           const anime2 =  await prismaClient.anime.update({
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
          }).catch((err) => console.log(err.message));

          await Promise.all(
            anime.episodes.map(async (episode: Episode) => {
              await  prismaClient.episode.create({
                data: {
                id: episode.id,
                number: episode.number,
                url: episode.url,
                animeId: anime.id,
              },
            }).catch((error: Error)=> console.log(error.message));
            return;
            })
          ).catch((err: Error) => console.log(err.message));

          return;
        } else if (anime) {
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
      return;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export default Workers;
