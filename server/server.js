import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import connectDB from './config/db.js';

import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./Inngest/inngest.js"

import showRouter from './routes/showRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import adminRouter from './routes/adminRoutes.js';

const app = express();
const port = 7000;

await connectDB();

// Middlewares
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())


// API builders
app.get('/',(req,res)=> res.send('Server is Live...'))
app.use('/api/inngest', serve({ client: inngest, functions }))

// Routes
app.use('/api/show',showRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/admin',adminRouter)

app.listen(port, ()=> console.log(`Server is Live at port:${port}`));