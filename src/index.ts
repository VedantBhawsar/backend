import express, { Express, Request, Response } from 'express';

//Middleware imports
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Prisma Client
import { PrismaClient } from '@prisma/client';

// Routes Imports
import { NewsRoute } from './routes/newsRoutes';
import { animeRoute } from './routes/animeRoutes';
import Workers from './workers';

dotenv.config();

export const prismaClient = new PrismaClient();
const app: Express = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Routes
app.use('/anime', animeRoute);
app.use('/news', NewsRoute);


//API's
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: `Server Started` });
});

//Listens Statements
app.listen(process.env.PORT ?? 3001, () => {
  console.log(`Server is running at ${process.env.PORT ?? 3001}!`);
});

setInterval(() => new Workers(), 3 *60 *10000);