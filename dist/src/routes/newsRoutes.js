"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRoute = void 0;
const express_1 = require("express");
const news_1 = __importDefault(require("../controllers/news"));
const router = (0, express_1.Router)();
exports.NewsRoute = router;
router.get("/fetch", news_1.default.fetchNewsFeeds);
