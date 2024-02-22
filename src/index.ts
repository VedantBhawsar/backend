import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import axios from "axios";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(morgan("dev"));

app.get("/", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/changes?page=1",
      {
        headers: {
          Authorization: `Bearer 4eab1c048a2e2e8a282f2b01dcecc3e8`,
          accept: "application/json",
        },
      }
    );
    console.log(response.data);

    res.send("server is running...");
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
