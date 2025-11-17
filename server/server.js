import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';

const app = express();
const port = 7000;

// Middlewares
app.use(express.json())
app.use(cors())


// API builders
app.get('/',(req,res)=> res.send('Server is Live...'))
app.listen(port, ()=> console.log(`Server is Live at port:${port}`));