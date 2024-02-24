import { Router } from "express";
import AnimeController from "../controllers/anime";

const router = Router();

router.get("/fetch/:id", AnimeController.fetchAnime);
router.get("/sources/:id", AnimeController.fetchSources);
router.get("/top-airing", AnimeController.fetchTopAiring);
router.get("/recent", AnimeController.fetchRecent);
router.get("/popular", AnimeController.fetchPopular);
router.get("/search", AnimeController.search);
router.get('/servers/:id', AnimeController.fetchServers);

export { router as animeRoute };
