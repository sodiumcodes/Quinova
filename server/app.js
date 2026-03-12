import express from 'express';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserRoute from './routes/user.route';
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

app.use('/user', UserRoute)

export default app;