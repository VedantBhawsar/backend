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
const app: Express = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/tmdb", getMovie);
app.use("/anime", animeRoute);
app.use("/news", NewsRoute);

app.get("/", async (req: Request, res: Response) => {
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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
