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
app.listen(process.env.PORT ?? 3001, () => {
    console.log(`Server is running at ${process.env.PORT ?? 3001}!`);
});
setInterval(() => new workers_1.default(), 3 * 60 * 10000);
