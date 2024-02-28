import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import axios from "axios";
import { getMovie } from "./controllers/tmdb";
import { animeRoute } from "./routes/animeRoutes";
import { NewsRoute } from "./routes/newsRoutes";
import { TMDB_URI } from "./config";
import { error } from "console";
import cors from "cors";
import cluster from "cluster";
import os from "os";
dotenv.config();

const cpus = os.availableParallelism();
const port = process.env.PORT || 3000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  const app: Express = express();
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors());

  app.get("/tmdb", getMovie);
  app.use("/anime", animeRoute);
  app.use("/news", NewsRoute);

  app.get("/check-tmdb", async (req: Request, res: Response) => {
    try {
      await axios.get("https://api.themoviedb.org/3/movie/changes?page=1", {
        headers: {
          Authorization: `Bearer ${TMDB_URI}`,
          accept: "application/json",
        },
      });
      return res.status(200).json("server is running");
    } catch (error: any) {
      return res.status(500).json("server is down please connect proxy");
    }
  });

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: `Hello World ${process.pid}` });
  });

  app.listen(port, () => {
    console.log(`Worker ${process.pid} started!`);
  });
}
