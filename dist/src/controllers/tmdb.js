"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovie = void 0;
const config_1 = require("../config");
const axios_1 = __importDefault(require("axios"));
const API = {
    search: config_1.TMDB_URI + "/search/tv?query=",
    logo: config_1.TMDB_URI + "/tv",
};
async function getTMDBLogo(id) {
    const { data } = await axios_1.default.get(`${API.logo}/${id}/images`, {
        headers: {
            Authorization: `Bearer ${config_1.ACCESS_TOKEN}`,
            accept: "application/json",
        },
    });
    const infoData = data;
    return infoData;
}
async function getMovie(req, res) {
    try {
        const { query } = req.query;
        const { data } = await axios_1.default.get("https://imdb-api.projects.thetuhin.com/search?query=" + query);
        console.log('hello');
        if (!data.results[0]) {
            return new Error("Empty");
        }
        const detailData = await axios_1.default.get("https://imdb-api.projects.thetuhin.com/title/" + data?.results[0]?.id);
        if (!detailData) {
            return new Error("No data found");
        }
        return res.status(200).json({ message: "result", data: detailData.data });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
}
exports.getMovie = getMovie;
