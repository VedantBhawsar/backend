"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express_1 = __importDefault(require("express"));
//Middleware imports
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// Prisma Client
const client_1 = require("@prisma/client");
// Routes Imports
const newsRoutes_1 = require("./routes/newsRoutes");
const animeRoutes_1 = require("./routes/animeRoutes");
const workers_1 = __importDefault(require("./workers"));
dotenv_1.default.config();
exports.prismaClient = new client_1.PrismaClient();
const app = (0, express_1.default)();
//Middlewares
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
//Routes
app.use('/anime', animeRoutes_1.animeRoute);
app.use('/news', newsRoutes_1.NewsRoute);
//API's
app.get('/', (req, res) => {
    res.status(200).json({ message: `Server Started` });
});
//Listens Statements
app.listen(3001, () => {
    console.log(`Server is running at 3001!`);
});
app.listen(3002, () => {
    console.log(`Server is running at 3002!`);
});
// app.listen(3003, () => {
//   console.log(`Server is running at 3003!`);
// });
// app.listen(3004, () => {
//   console.log(`Server is running at 3004!`);
// });
// Workers for fetching data in 30 minutes of intervals
// setInterval(() => new Workers(), 3 * 60 * 10000);
setInterval(async () => {
    await fetch('https://backend1-dv9d.onrender.com/');
}, 2000);
const worker = new workers_1.default();
worker.fetchRecentAnime();
