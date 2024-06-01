"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRoute = void 0;
const express_1 = require("express");
const news_1 = __importDefault(require("../controllers/news"));
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
exports.NewsRoute = router;
// Routes for accessing news
router.get("/fetch", news_1.default.fetchNewsFromDB);
router.get("/fetch-feeds", news_1.default.fetchNewsFeeds);
router.get("/download", async (req, res) => {
    const data = await axios_1.default
        .request({
        method: "GET",
        url: "https://embtaku.pro/download?id=MjEzMDA4&token=PPQjf03A8ISCJD0BerC9iA&expires=1716481205",
        headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            "Sec-Ch-Ua": `"Brave";v="125", "Chromium";v="125", "Not.A/Brand";v="24"`,
            "Sec-Ch-Ua-Platform": "Linux",
        },
    })
        .catch((error) => console.log(error.message));
    console.log(data);
    res.send(data?.data);
});
