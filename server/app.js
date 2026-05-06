import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

const normalizeOrigin = (origin) => origin.trim().replace(/\/$/, '');
const defaultOrigins = ['http://localhost:5173', 'https://localhost:5173'];
const configuredOrigins = [process.env.CORS_ORIGIN, process.env.CORS_ORIGINS]
    .filter(Boolean)
    .flatMap((origins) => origins.split(','))
    .map(normalizeOrigin)
    .filter(Boolean);
const allowedOrigins = new Set([...defaultOrigins, ...configuredOrigins]);

//app.use() -> for middlewares and config 
/*
    app.use(express.json()) // for parsing application/json
    app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
*/

app.use(cors({
    origin(origin, callback) {
        // Allow non-browser requests (Postman, curl, Vite proxy, server-to-server) and configured frontends.
        if (!origin || allowedOrigins.has(normalizeOrigin(origin))) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked origin: ${origin}. Add it to CORS_ORIGIN in the server .env file.`));
    },
    credentials: true
}));

app.use(express.json({limit: "32kb"}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // logs requests
app.use(cookieParser());

app.get('/api/v1/health', (_, res) => {
    res.status(200).json({ status: 'ok', message: 'Quinova API is reachable' });
});

//routes import
import userRoute from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';
import engagementRouter from './routes/engagement.route.js'
import analyticsRouter from './routes/analytics.route.js';
import portfolioRouter from './routes/portfolio.route.js';
import discoveryRouter from './routes/discovery.route.js'; 
import collectionRouter from './routes/collection.route.js'

//routes declaration
app.use('/api/v1/user', userRoute);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1', engagementRouter);
app.use('/api/v1/analytics', analyticsRouter);
app.use('/api/v1/portfolio', portfolioRouter);
app.use('/api/v1/discover', discoveryRouter); 
app.use('/api/v1/collection', collectionRouter);

export default app;
