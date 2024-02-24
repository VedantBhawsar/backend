import { Request, Response } from "express";
import { NEWS, Topics } from "@consumet/extensions";

const ann = new NEWS.ANN();

class NewsController {
  public async fetchNewsFeeds(req: Request, res: Response) {
    try {
      const news = await ann.fetchNewsFeeds(Topics.ANIME);
      return res.status(200).json(news);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ message: "Failed to fetch news" });
    }
  }
}

export default new NewsController();
