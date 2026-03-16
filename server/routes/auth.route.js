import { Router } from "express";
import { login, logout, register, refreshAccessToken } from '../controllers/auth.controller.js'
import { verifyUser } from "../middlewares/auth.middleware.js";
const authRouter = Router();

// authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/register', register);
authRouter.post('/logout', verifyUser, logout);
//here we dont need verifyUser middleware, since we are using this when the access token has expired
authRouter.post('/refresh-access-token', refreshAccessToken);
export default authRouter;