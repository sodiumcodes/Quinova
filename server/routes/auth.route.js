import { Router } from "express";
import { login, logout, register, refreshAccessToken, getMe } from '../controllers/auth.controller.js'
import { verifyUser } from "../middlewares/auth.middleware.js";
const authRouter = Router();

// authRouter.post('/register', register)
authRouter.route('/login').post(login)
authRouter.route('/register').post( register);
authRouter.route('/logout').post( verifyUser, logout);

//here we dont need verifyUser middleware, since we are using this when the access token has expired
authRouter.route('/refresh-access-token').post(refreshAccessToken);
authRouter.route('/me').get(verifyUser, getMe)
export default authRouter;