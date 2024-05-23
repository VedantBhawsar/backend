import { Request, Response } from 'express';
import { NEWS, Topics } from '@consumet/extensions';
import { prismaClient } from '..';
const ann = new NEWS.ANN();

class NewsController {
  public async fetchNewsFromDB(req: Request, res: Response) {
    try {
      const news = await prismaClient.news.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
      });
      return res.status(200).json({ news, length: news.length });
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ message: 'Failed to fetch news' });
    }
  }
  public async fetchNewsFeeds(req: Request, res: Response) {
    try {
      const news = await ann.fetchNewsFeeds(Topics.ANIME);
      const newsWithoutPreview = news.map((item) => {
        const { preview, ...rest } = item;
        return rest;
      });
      prismaClient.news
        .createMany({
          data: newsWithoutPreview,
          skipDuplicates: true,
        })
        .catch((error:any) => console.log(error.message));

      return res.status(200).json({ news, length: newsWithoutPreview.length });
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ message: 'Failed to fetch news' });
    }
  }
}

export default new NewsController();
