"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const __1 = require("..");
const ann = new extensions_1.NEWS.ANN();
class NewsController {
    async fetchNewsFromDB(req, res) {
        try {
            const news = await __1.prismaClient.news.findMany({
                take: 10,
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return res.status(200).json({ news, length: news.length });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: 'Failed to fetch news' });
        }
    }
    async fetchNewsFeeds(req, res) {
        try {
            const news = await ann.fetchNewsFeeds(extensions_1.Topics.ANIME);
            const newsWithoutPreview = news.map((item) => {
                const { preview, ...rest } = item;
                return rest;
            });
            __1.prismaClient.news
                .createMany({
                data: newsWithoutPreview,
                skipDuplicates: true,
            })
                .catch((error) => console.log(error.message));
            return res.status(200).json({ news, length: newsWithoutPreview.length });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: 'Failed to fetch news' });
        }
    }
}
exports.default = new NewsController();
