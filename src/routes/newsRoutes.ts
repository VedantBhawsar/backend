import { Router } from "express";
import NewsController  from "../controllers/news";
const router = Router();
router.get("/fetch", NewsController.fetchNewsFeeds);
export { router as NewsRoute };
