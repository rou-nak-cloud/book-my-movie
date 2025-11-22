import express from 'express'
import { addShow, getNowPlayingMovies } from '../Controllers/showController.js';
import { protectAdmin } from '../middlewares/auth.js';

const showRouter = express.Router();

showRouter.get('/now-playing',protectAdmin, getNowPlayingMovies);
showRouter.post('/add-show', protectAdmin, addShow);

export default showRouter;