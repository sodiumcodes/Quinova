import express from 'express';
import morgan from 'morgan';
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
app.use(morgan("dev")); // logs requests
app.use(cookieParser());

//routes import
import userRoute from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';
import engagementRouter from './routes/engagement.route.js'
import analyticsRouter from './routes/analytics.route.js';
//routes declaration
app.use('/api/v1/user', userRoute);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1', engagementRouter);
app.use('/api/v1/analytics', analyticsRouter);

export default app;