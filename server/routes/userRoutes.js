import express from 'express';
import { getFavorites, getUserBookings, UpdateFavorite } from '../Controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/bookings',getUserBookings)
userRouter.get('/update-favorite',UpdateFavorite)
userRouter.get('/favorites', getFavorites)

export default userRouter;