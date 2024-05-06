"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const tmdb_1 = require("./controllers/tmdb");
const animeRoutes_1 = require("./routes/animeRoutes");
const newsRoutes_1 = require("./routes/newsRoutes");
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const os_1 = __importDefault(require("os"));
const morgan_1 = __importDefault(require("morgan"));
// const prisma = new PrismaClient();
dotenv_1.default.config();
const cpus = os_1.default.cpus().length;
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.get('/tmdb', tmdb_1.getMovie);
app.use('/anime', animeRoutes_1.animeRoute);
app.use('/news', newsRoutes_1.NewsRoute);
app.get('/check-tmdb', async (req, res) => {
    try {
        await axios_1.default.get('https://api.themoviedb.org/3/movie/changes?page=1', {
            headers: {
                Authorization: `Bearer ${config_1.TMDB_URI}`,
                accept: 'application/json',
            },
        });
        return res.status(200).json('server is running');
    }
    catch (error) {
        return res.status(500).json('server is down please connect proxy');
    }
});
app.get('/', (req, res) => {
    res.status(200).json({ message: `Server Started` });
});
// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);
//   for (let i = 0; i < 1; i++) {
//     cluster.fork();
//   }
//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     cluster.fork();
//   });
//   cluster.on("disconnect", (worker) => {
//     console.log(`worker ${worker.process.pid} disconnected`);
//     worker.kill();
//     cluster.fork();
//   });
// } else {
//   app.listen(port, () => {
//     console.log(`Worker ${process.pid} started!`);
//   });
// }
setInterval(async () => {
    await axios_1.default.get('https://backend1-dv9d.onrender.com/');
    console.log('pinged');
}, 60 * 1000);
app.listen(3001, () => {
    console.log(`Server is running at 3001!`);
});
app.listen(3002, () => {
    console.log(`Server is running at 3002!`);
});
app.listen(3003, () => {
    console.log(`Server is running at 3003!`);
});
app.listen(3004, () => {
    console.log(`Server is running at 3004!`);
});
