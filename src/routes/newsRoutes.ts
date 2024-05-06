import { Router } from 'express';
import NewsController from '../controllers/news';
const router = Router();
router.get('/fetch', NewsController.fetchNewsFromDB);
router.get('/fetch-feeds', NewsController.fetchNewsFeeds);
export { router as NewsRoute };
