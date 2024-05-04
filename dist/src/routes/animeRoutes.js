"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animeRoute = void 0;
const express_1 = require("express");
const anime_1 = __importDefault(require("../controllers/anime"));
const router = (0, express_1.Router)();
exports.animeRoute = router;
router.get("/fetch/:id", anime_1.default.fetchAnime);
router.get("/sources/:id", anime_1.default.fetchSources);
router.get("/top-airing", anime_1.default.fetchTopAiring);
router.get("/recent", anime_1.default.fetchRecent);
router.get("/popular", anime_1.default.fetchPopular);
router.get("/search", anime_1.default.search);
router.get('/servers/:id', anime_1.default.fetchServers);
