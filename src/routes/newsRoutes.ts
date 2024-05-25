import { Router } from "express";
import NewsController from "../controllers/news";
import axios from "axios";

const router = Router();

// Routes for accessing news
router.get("/fetch", NewsController.fetchNewsFromDB);
router.get("/fetch-feeds", NewsController.fetchNewsFeeds);
router.get("/download", async (req, res) => {
  const data: any = await axios
    .request({
      method: "GET",
      url: "https://embtaku.pro/download?id=MjEzMDA4&token=PPQjf03A8ISCJD0BerC9iA&expires=1716481205",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Sec-Ch-Ua": `"Brave";v="125", "Chromium";v="125", "Not.A/Brand";v="24"`,
        "Sec-Ch-Ua-Platform": "Linux",
      },
    })
    .catch((error: Error) => console.log(error.message));
  console.log(data);
  res.send(data?.data);
});

export { router as NewsRoute };
