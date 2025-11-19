import express from 'express'
import { getNowPlayingMovies } from '../Controllers/showController.js';

const showRouter = express.Router();

showRouter.get('/now-playing', getNowPlayingMovies);

export default showRouter;