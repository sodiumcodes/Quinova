import express from 'express';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
//app.use() -> for middlewares and config 
/*
    app.use(express.json()) // for parsing application/json
    app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
*/

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit: "32kb"}));
app.use(express.urlencoded({ extended: true }));
app.use(multer);
app.use(cookieParser());

//routes import
import UserRoute from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

//routes declaration
app.use('/user', UserRoute)
app.use('/api/v1/auth', authRouter)
export default app;