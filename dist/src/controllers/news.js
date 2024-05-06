"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const ann = new extensions_1.NEWS.ANN();
class NewsController {
    async fetchNewsFeeds(req, res) {
        try {
            const news = await ann.fetchNewsFeeds(extensions_1.Topics.ANIME);
            return res.status(200).json(news);
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Failed to fetch news" });
        }
    }
}
exports.default = new NewsController();
