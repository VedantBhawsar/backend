"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCESS_TOKEN = exports.TMDB_URI = exports.MONGO_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 5001;
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/your-database';
exports.TMDB_URI = process.env.TMDB_URI || 'https://api.themoviedb.org/3';
exports.ACCESS_TOKEN = process.env.ACCESS_TOKEN;
